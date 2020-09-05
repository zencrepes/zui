import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import CytoscapeComponent from 'react-cytoscapejs';
import Cytoscape from 'cytoscape';
import COSEBilkent from 'cytoscape-cose-bilkent';

import RefreshIcon from '@material-ui/icons/Refresh';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import ExploreIcon from '@material-ui/icons/Explore';
import ClearIcon from '@material-ui/icons/Clear';

import { iRootState } from '../../../../../store';
import DataCard from '../../../../../components/dataCard';

Cytoscape.use(COSEBilkent);

const mapState = (state: iRootState) => ({});

const mapDispatch = (dispatch: any) => ({
  setNetworkGraph: dispatch.githubIssues.setNetworkGraph,
  setNetworkShowDialog: dispatch.githubIssues.setNetworkShowDialog,
  setNetworkNodeSelected: dispatch.githubIssues.setNetworkNodeSelected,
  setNetworkNodeHover: dispatch.githubIssues.setNetworkNodeHover,
  setSelectedTab: dispatch.githubIssues.setSelectedTab,
  setUpdateIssuesSelected: dispatch.githubIssues.setUpdateIssuesSelected,
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
    setNetworkGraph(this.chartRef);
    this.updateChart(this.chartRef);
  }

  clickIssue = (node: any) => {
    const { setNetworkNodeSelected, setNetworkShowDialog } = this.props;
    if (this.clickedLink === false) {
      this.clickedLink = true;
      setNetworkNodeSelected(node);
      setNetworkShowDialog(true);
      setTimeout(async () => {
        this.clickedLink = false;
      }, 500);
    }
  };

  updateChart = (cy: any) => {
    const { issuesGraph, setNetworkNodeHover } = this.props;

    cy.elements().remove();
    cy.add(issuesGraph.nodes);

    cy.on('mouseover', 'node', async (event: any) => {
      // const nodeId = event.target.id();
      setNetworkNodeHover(event.target.data());
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
    const { issuesGraph, history, setSelectedTab, setUpdateIssuesSelected, updateIssuesSelected } = this.props;

    const stylesheet = [
      {
        selector: 'node',
        style: {
          width: 10,
          height: 10,
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
        selector: '[state = "MERGED"]',
        style: {
          backgroundColor: '#6f42c1',
        },
      },
      // {
      //   selector: '[?partial]',
      //   style: {
      //     shape: 'rectangle',
      //   },
      // },
      {
        selector: '[typename = "PullRequest"]',
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

    const redrawView = () => {
      const layout = this.chartRef.layout({
        name: 'cose-bilkent',
        animate: 'end',
        animationEasing: 'ease-out',
        animationDuration: 1000,
        randomize: true,
      });
      layout.run();
    };

    const resetView = () => {
      this.chartRef.fit();
    };

    const clearSelected = () => {
      setUpdateIssuesSelected([]);
    };

    const openIssues = () => {
      const issues = issuesGraph.nodes.filter((n: any) => n.group === 'nodes').map((n: any) => n.id);
      if (issues.length > 0) {
        setSelectedTab('list');
        const newQuery = {
          op: 'and',
          content: [
            {
              op: 'in',
              content: {
                field: 'id',
                value: issues,
              },
            },
          ],
        };
        history.push({
          pathname: '/githubIssues',
          search: '?q=' + encodeURIComponent(JSON.stringify(newQuery)),
          state: { detail: newQuery },
        });
      }
    };

    const headerTitle =
      issuesGraph.source === 'id'
        ? 'Generated from issues selected in the list view'
        : 'Generated from the current query';
    const rootNodes = issuesGraph.nodes.filter((i: any) => i.data.distance === 0 && i.group === 'nodes');

    const actionButtons = [
      {
        name: 'Redraw View',
        onClick: redrawView,
        icon: <RefreshIcon />,
      },
      {
        name: 'Reset View',
        onClick: resetView,
        icon: <FullscreenIcon />,
      },
      {
        name: 'See issues list',
        onClick: openIssues,
        icon: <ExploreIcon />,
      },
    ];
    if (updateIssuesSelected.length > 0) {
      actionButtons.push({
        name: 'Clear Selected',
        onClick: clearSelected,
        icon: <ClearIcon />,
      });
    }

    return (
      <DataCard
        title="Issues Graph"
        subtitle={headerTitle + ', with ' + rootNodes.length + ' root nodes.'}
        actionButtons={actionButtons}
      >
        <CytoscapeComponent
          elements={[]}
          layout={{ name: 'cose-bilkent' }}
          style={{ height: '600px', textAlign: 'left' }}
          stylesheet={stylesheet}
          cy={(cy: any) => (this.chartRef = cy)}
        />
      </DataCard>
    );
  }
}

export default connect(mapState, mapDispatch)(withRouter(IssuesGraph));
