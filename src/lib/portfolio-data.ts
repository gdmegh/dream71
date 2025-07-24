

export const projects = {
  all: [
    
  ],
  web() {
    return this.all.filter(project => project.category === 'web');
  },
  mobile() {
    return this.all.filter(project => project.category === 'mobile');
  },
  ai() {
    return this.all.filter(project => project.category === 'ai');
  }
};
