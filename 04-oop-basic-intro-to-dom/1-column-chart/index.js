export default class ColumnChart {
  chartHeight = 50;
  element;

  constructor({data = [], label = '', value = 0, link = '', formatHeading = (value) => value} = {}
  ) {
    this.data = data;
    this.label = label;
    this.value = value;
    this.link = link;
    this.formatHeading = formatHeading;
    this.element = this.addTemplate(this.renderer());
  }

  update(data) {
    this.data = data;
    this.element = this.addTemplate(this.renderer());
  }

  addTemplate(template) {
    const element = document.createElement("div");
    if (this.data.length) {
      element.classList.add("column-chart");
    } else {
      element.classList.add("column-chart_loading");
      element.classList.add("column-chart");
    }
    element.style.setProperty('--chart-height', `${this.chartHeight}`);
    element.innerHTML = template;
    return element;
  }

  addLink() {
    return this.link ?
      `<a href="/${this.link}" class="column-chart__link">View all</a>` : '';
  }

  addChart(data) {
    let chartColumns = '';
    const maxChartColumnValue = Math.max(...data);
    for (const item of data) {
      let chartColumnHeightValue = ((item / maxChartColumnValue) * 100).toFixed(0) + '%';
      chartColumns += `<div style="--value: ${Math.floor(item * (this.chartHeight / maxChartColumnValue))}" data-tooltip="${chartColumnHeightValue}"></div>`;
    }
    return `<div data-element="body" class="column-chart__chart">${chartColumns}</div>`;
  }

  renderer() {
    return `
      <div class="column-chart__title">
      Total ${this.label}
        ${this.addLink(this.link)}
      </div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header">
            ${this.formatHeading(this.value)}
       </div>
            ${this.addChart(this.data)}
      </div>`;
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
