/**
 * The breakpoints handler class.
 *
 * @constructor
 */
class Breakpoints {

  constructor() {
    this.TABLET = 534;
    this.DESKTOP = 1021;
  }

  /**
   * If the page is mobile.
   *
   * @returns {boolean}
   */
  isMobile() {
    return this.getWindowWidth() < this.TABLET;
  };

  /**
   * If the page is tablet.
   *
   * @returns {boolean}
   */
  isTablet() {
    return this.getWindowWidth() >= this.TABLET && this.getWindowWidth() < this.DESKTOP;
  };

  /**
   * If the page is desktop.
   *
   * @returns {boolean}
   */
  isDesktop() {
    return this.getWindowWidth() >= this.DESKTOP;
  };

  /**
   * Gets window width.
   *
   * @returns {int}
   *   Gets window width in pixels.
   */
  getWindowWidth() {
    return window.innerWidth;
  }

}

export {Breakpoints};
