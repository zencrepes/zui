import React, { Component } from 'react';
import { loader } from 'graphql.macro';

import CustomCard from '../../../../../components/customCard';
import IssueCompact from './issueTooltip';

import { connect } from 'react-redux';

import Cytoscape from 'cytoscape';
import COSEBilkent from 'cytoscape-cose-bilkent';
//import cytoscapeQtip from 'cytoscape-qtip';

import popper from 'cytoscape-popper';

import Tippy from 'tippy.js';
import 'tippy.js/themes/light-border.css';
import ReactDOMServer from 'react-dom/server';

import CytoscapeComponent from 'react-cytoscapejs';

import { iRootState } from '../../../../../store';

const GQL_SINGLEISSUE = loader('../../../graphql/getIssue.graphql');

Cytoscape.use(COSEBilkent);
Cytoscape.use(popper);

const mapState = (state: iRootState) => ({
  networkDistanceGraph: state.githubIssues.networkDistanceGraph,
});

const mapDispatch = (dispatch: any) => ({
  setNetworkGraph: dispatch.githubIssues.setNetworkGraph,
  setNetworkShowDialog: dispatch.githubIssues.setNetworkShowDialog,
  setNetworkNodeSelected: dispatch.githubIssues.setNetworkNodeSelected,
});

class IssuesGraph extends Component<any, any> {
  chartRef: any = React.createRef();
  tippyInstances: any = {};
  tippyINstance: any = {};
  selectedTippies: any = {};
  clickedLink = false;

  componentDidUpdate() {
    this.clickedLink = false;
    this.updateChart(this.chartRef);
  }

  componentDidMount() {
    const { setNetworkGraph } = this.props;
    console.log(this.chartRef);
    setNetworkGraph(this.chartRef);
    this.updateChart(this.chartRef);
  }

  clickIssue = (node: any) => {
    const { setNetworkNodeSelected, setNetworkShowDialog } = this.props;
    if (this.clickedLink === false) {
      this.clickedLink = true;
      setNetworkNodeSelected(node);
      setNetworkShowDialog(true);
      this.clearTippies();
      setTimeout(async () => {
        this.clickedLink = false;
      }, 500);
    }
  };

  //https://github.com/cytoscape/cytoscape.js/blob/master/documentation/demos/tokyo-railways/tokyo-railways.js
  makeTippy = async (node: any) => {
    const { zapiClient } = this.props;
    let nodeData = node.data();
    console.log(nodeData.partial);
    if (nodeData.partial !== true) {
      const data = await zapiClient.query({
        query: GQL_SINGLEISSUE,
        variables: {
          id: node.id(),
        },
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
      });
      nodeData = data.data.githubIssues.data.item;
    }

    const tip = Tippy(document.createElement('div'), {
      // const tip = Tippy(node.popperRef(), {
      // content: node.id(),
      content: function () {
        return ReactDOMServer.renderToString(<IssueCompact issue={nodeData} />);
      },
      // content: function () {
      //   return ReactDOMServer.renderToString(<span>{nodeData.title}</span>);
      // },
      // getReferenceClientRect: node.popperRef().getBoundingClientRect(),
      theme: 'light-border',
      // arrow: true,
      hideOnClick: false,
      allowHTML: true,
      arrow: false,
      // interactive: true,
      interactiveBorder: 30,
      trigger: 'manual',
      showOnCreate: true,
      // sticky: true,
      getReferenceClientRect: () => node.popperRef().getBoundingClientRect(),
      popperOptions: {
        strategy: 'fixed',
      },
      //   sticky: true,
      // interactive: true,
      // onShow(instance: any) {
      //   console.log(instance);
      //   // instance.popperInstance.reference = node.popperRef();
      // },
    });
    return tip;
    /*
    return Tippy(node.popperRef(), {
      content: function () {
        var div = document.createElement('div');
        div.innerHTML = text;
        // return div;
        return ReactDOMServer.renderToString(<IssueCompact issue={nodeElement} />);
      },
      getReferenceClientRect: null,
      trigger: 'manual',
      theme: 'light-border',
      arrow: true,
      placement: 'bottom',
      //hideOnClick: true,
      interactive: true,
      //   multiple: true,
      //   sticky: true,
      popperOptions: {
        strategy: 'fixed',
      },
    });
    */
  };

  // makePopper = (ele: any) => {
  //   console.log(ele);
  //   console.log(ele.data());
  //   let ref = ele.popperRef();
  //   ele.tippy = Tippy(document.createElement('div'), {
  //     //   content: ReactDOMServer.renderToString(<IssueCompact issue={ele.data} />),
  //     content: ele.id(),
  //     hideOnClick: false,
  //     onShow(instance: any) {
  //       console.log(instance);
  //       // instance.popperInstance.reference = ref;
  //     },
  //   });
  // };

  // Clear all previous tippies
  clearTippies = () => {
    Object.values(this.tippyInstances).forEach((tippy: any) => {
      tippy.hide();
      tippy.destroy();
    });
    this.tippyInstances = {};
    this.selectedTippies = {};
  };

  updateChart = (cy: any) => {
    console.log('updateChart');
    const { issuesGraph, networkDistanceGraph } = this.props;

    const issuesGraphFiltered = issuesGraph.filter(
      (i: any) => i.data.distance <= networkDistanceGraph || i.data.distance === null,
    );

    this.clearTippies();
    // const makePop = this.makePopper;
    cy.elements().remove();
    cy.add(issuesGraphFiltered);

    // cy.ready(function () {
    //   cy.elements().forEach(function (ele: any) {
    //     makePop(ele);
    //   });
    // });

    // cy.elements().unbind('mouseover');
    // cy.elements().bind('mouseover', (event: any) => event.target.tippy.show());

    // cy.elements().unbind('mouseout');
    // cy.elements().bind('mouseout', (event: any) => event.target.tippy.hide());

    cy.on('mouseover', 'node', async (event: any) => {
      console.log('mouseover');
      console.log(event);
      const nodeId = event.target.id();
      const dataNode = event.target.data();
      const node = event.target;
      if (this.tippyInstances[nodeId] === undefined) {
        this.tippyInstances[nodeId] = await this.makeTippy(node);
      }
      this.tippyInstances[nodeId].show();
    });

    cy.on('mouseout', 'node', (event: any) => {
      console.log('mouse out');
      const nodeId = event.target.id();
      if (this.tippyInstances[nodeId] !== undefined) {
        // this.tippyInstances[nodeId].hide();
        Object.values(this.tippyInstances).forEach((tippy: any) => {
          tippy.hide();
        });
        // this.tippyInstances[nodeId].destroy();
        // delete this.tippyInstances[nodeId];
      }
    });

    cy.on('click', 'node', (event: any) => {
      this.clickIssue(event.target);
    });

    const layout = cy.layout({
      name: 'cose-bilkent',
      animate: false,
    });
    layout.run();
  };

  render() {
    const stylesheet = [
      {
        selector: 'node',
        style: {
          width: 10,
          height: 10,
          //                    content: 'data(id)'
          //                    shape: 'vee'
        },
      },
      {
        selector: 'edge',
        style: {
          'curve-style': 'straight',
          'target-arrow-shape': 'triangle',
          width: 2,
          'line-color': '#ddd',
          'target-arrow-color': '#ddd',
        },
      },
      {
        selector: ':parent',
        style: {
          'background-opacity': 0.333,
        },
      },
      {
        selector: '[state = "OPEN"]',
        style: {
          backgroundColor: '#28a745',
        },
      },
      {
        selector: '[state = "CLOSED"]',
        style: {
          backgroundColor: '#cb2431',
        },
      },
      {
        selector: '[?partial]',
        style: {
          shape: 'rectangle',
        },
      },
      {
        selector: '[distance = 0]',
        style: {
          width: 20,
          height: 20,
        },
      },
      {
        selector: 'edge.not-path',
        style: {
          opacity: 0.1,
          'z-index': 0,
        },
      },
      {
        selector: 'node.not-path',
        style: {
          opacity: 0.333,
          'z-index': 0,
        },
      },
      {
        selector: 'edge.path',
        style: {
          opacity: 0.888,
          'z-index': 0,
          width: 4,
          'line-color': '#2196f3',
          'target-arrow-color': '#2196f3',
        },
      },
    ];

    /*
edge.not-path {
  opacity: 0.1;
  z-index: 0;
}

node.not-path {
  opacity: 0.333;
  z-index: 0;
}

edge.path {
  opacity: 0.666;
  z-index: 0;
}
 */

    return (
      <CustomCard headerTitle="Issues Graph">
        <CytoscapeComponent
          elements={[]}
          layout={{ name: 'cose-bilkent' }}
          style={{ height: '600px', textAlign: 'left' }}
          stylesheet={stylesheet}
          cy={(cy: any) => (this.chartRef = cy)}
        />
      </CustomCard>
    );
  }
}

export default connect(mapState, mapDispatch)(IssuesGraph);
