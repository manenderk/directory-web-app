export interface UI {
  homeData: {
    sectionOrder: string[],
    category: {
      desktop: {
        rows: number,
        cols: number
      },
      tablet: {
        rows: number,
        cols: number
      },
      mobile: {
        rows: number,
        cols: number
      }
    },
    event: {
      desktop: {
        rows: number,
        cols: number
      },
      tablet: {
        rows: number,
        cols: number
      },
      mobile: {
        rows: number,
        cols: number
      }
    },
    news: {
      desktop: {
        rows: number,
        cols: number
      },
      tablet: {
        rows: number,
        cols: number
      },
      mobile: {
        rows: number,
        cols: number
      }
    }
  };
}
