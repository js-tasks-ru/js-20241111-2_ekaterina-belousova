export default class NotificationMessage {
  static lastNotificationShown;
  element;
  timer;

  constructor(message = '', {
    duration = 2000,
    type = 'success'
  } = {}) {
    this.duration = duration;
    this.type = type;
    this.message = message;
    this.element = this.createNotificationTemplate(this.createNotification());
  }

  show(targetElement = document.body) {
    if (NotificationMessage.lastNotificationShown) {
      NotificationMessage.lastNotificationShown.destroy();
    }
    targetElement.appendChild(this.element);
    NotificationMessage.lastNotificationShown = this;
    this.timer = setTimeout(() => this.remove(), this.duration);
  }

  createNotificationTemplate(template) {
    const element = document.createElement('div');
    element.innerHTML = template;
    return element.firstElementChild;
  }

  createNotification() {
    return `  <div class="notification ${this.type}" style="--value:${this.duration}ms">
    <div class="timer"></div>
    <div class="inner-wrapper">
      <div class="notification-header">${this.type}</div>
      <div class="notification-body">
        ${this.message}
      </div>
    </div>
  </div>`;
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    clearTimeout(this.timer);
  }
}
