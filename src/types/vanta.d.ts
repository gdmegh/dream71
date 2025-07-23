export type VantaBase = {
  (options: {
    el: HTMLElement | string;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
  }): {
    destroy: () => void;
  };
};

export type VantaTopology = VantaBase & {
  (options: {
    color?: number | string;
    backgroundColor?: number | string;
  }): {
    destroy: () => void;
  };
};
