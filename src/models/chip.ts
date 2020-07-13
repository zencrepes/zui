// Represent a GitHub token chip (used for verifying rate limiting)
export const chip = {
  state: {
    limit: 5000,
    cost: 1,
    remaining: 5000,
    resetAt: '',
  },

  reducers: {
    updateChip(state: any, newChip: any) {
      if (newChip === undefined) {
        newChip = state;
      }
      return newChip;
    },
    setRemaining(state: any, payload: any) {
      return { ...state, remaining: payload };
    },
  },
};
