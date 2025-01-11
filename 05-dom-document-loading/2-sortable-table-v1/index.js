export default class SortableTable {
  element;
  subElements = {};

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.renderTable();
    this.selectSubElements();
  }

  renderTable() {
    this.element = this.addTemplate(this.createTable());
  }

  selectSubElements() {
    this.element
      .querySelectorAll("[data-element]")
      .forEach(
        (element) => (this.subElements[element.dataset.element] = element)
      );
  }

  addTemplate(template) {
    const element = document.createElement('div');
    element.innerHTML = template;
    return element.firstElementChild;
  }

  createTableHeader() {
    return `<div data-element="header" class="sortable-table__header sortable-table__row">
    ${this.headerConfig.map(elem => `<div class="sortable-table__cell" data-id="${elem.id}" data-sortable="${elem.sortable}" data-order="asc">
    <span>${elem.title}</span>
    <span data-element="arrow" class="sortable-table__sort-arrow">
    <span class="sort-arrow"></span>
    </span></div>`).join('')}</div>`;
  }

  createTableRow(elem) {
    return `
    <a href="/products/${elem.id}" class="sortable-table__row">
    ${this.headerConfig
      .map((column) => this.createTableCell(elem, column))
      .join("")}
  </a>`;
  }

  createTableCell(elem, column) {
    if (column.template) {
      return column.template(elem.images);
    } else {
      return `<div class="sortable-table__cell">${elem[column.id]}</div>`;
    }
  }

  createTableBody() {
    return `
    <div data-element="body" class="sortable-table__body">
        ${this.data.map((elem) => this.createTableRow(elem)).join("")}
    </div>
          `;
  }

  sort(field, order) {
    const sortedData = this.sortData(field, order);

    this.subElements.body.innerHTML = this.createTableBody(sortedData);

  }

  sortData(field, order) {
    const arr = [...this.data];
    const column = this.headerConfig.find(item => item.id === field);
    const {sortType} = column;
    const directions = {
      asc: 1,
      desc: -1
    };

    const direction = directions[order];


    return arr.sort((a, b) => {
      switch (sortType) {
      case 'number':
        return direction * (a[field] - b[field]);
      case 'string':
        return direction * a[field].localeCompare(b[field], ['ru', 'en']);
      }
    });
  }

  createTable() {
    return `
    <div class="sortable-table">
    ${this.createTableHeader()}
    ${this.createTableBody()}
    </div>
    <div data-element="loading" class="loading-line sortable-table__loading-line"></div>
    <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
      <div>
        <p>No products satisfies your filter criteria</p>
        <button type="button" class="button-primary-outline">Reset all filters</button>
      </div>
    </div>`;
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}

