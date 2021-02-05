import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import './index.less';

interface AliPayScrollProps {
  keyId?: number,
  showScrollBar?: boolean
}

class AliPayScroll extends React.Component<AliPayScrollProps> {

  randomId: string = new Date().valueOf() + ''

  componentWillUnmount() {
    this.handleClearEffect()
  }

  componentWillUpdate() {
    this.handleClearEffect()
    this.handleObserverScrollView();
  }

  componentDidMount() {
    this.handleObserverScrollView()
  }

  handleClearEffect = () => {
    const scrollView = document.getElementById(`alipayScroll-scrollView-${this.randomId}`) as HTMLElement
    scrollView.removeEventListener('scroll', this.handleScroll)
  }

  handleSetScrollBar = () => {
    /**
     * 根据scrollView/scrollViewBox计算出内容百分比
     * 这个百分比就是scrollbar相对于alipayScrollElement的百分比
     */
    const scrollView = document.getElementById(`alipayScroll-scrollView-${this.randomId}`) as HTMLElement
    const scrollViewBox = document.getElementById(`alipayScroll-scrollViewBox-${this.randomId}`) as HTMLElement
    const scrollBar = document.getElementById(`alipayScroll-scrollBar-${this.randomId}`) as HTMLElement
    const scrollViewOffsetWidth = scrollView.offsetWidth
    const scrollViewBoxOffsetWidth = scrollViewBox.offsetWidth
    const sW = Math.floor((scrollViewOffsetWidth / scrollViewBoxOffsetWidth) * 100)
    scrollBar.style.width = `${sW}%`
    scrollView.addEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    /**
     * 根据scrollLeft/scrollViewBox宽度计算出scrollBar的移动百分比
     */
    const scrollView = document.getElementById(`alipayScroll-scrollView-${this.randomId}`) as HTMLElement
    const scrollViewBox = document.getElementById(`alipayScroll-scrollViewBox-${this.randomId}`) as HTMLElement
    const scrollBar = document.getElementById(`alipayScroll-scrollBar-${this.randomId}`) as HTMLElement
    const scrollViewBoxOffsetWidth = scrollViewBox.offsetWidth
    scrollView.addEventListener('scroll', (e) => {
      const res = ((scrollView.scrollLeft / scrollViewBoxOffsetWidth) * 100).toFixed(2)
      scrollBar.style.left = res + '%'
    })
  }

  handleObserverScrollView = () => {
    /**
     * 观察内容的变化，更新ScrollBar
     */
    const scrollViewBox = document.getElementById(`alipayScroll-scrollViewBox-${this.randomId}`) as HTMLElement
    const firstElementChild = scrollViewBox.firstElementChild as HTMLElement

    const resizeObserver = new ResizeObserver(() => {
      scrollViewBox.style.width = `${firstElementChild.offsetWidth}px`
      this.handleSetScrollBar()
    })
    resizeObserver.observe(firstElementChild);
  }

  render() {
    const { showScrollBar = true } = this.props
    return (
      <div className="alipayScroll">
        <div className="alipayScroll-scrollView" id={ `alipayScroll-scrollView-${this.randomId}` }>
          <div className="alipayScroll-scrollViewBox" id={ `alipayScroll-scrollViewBox-${this.randomId}` }>
            { this.props.children || <span /> }
          </div>
        </div>

        <div className="alipayScrollElement" id={ `alipayScrollElement-${this.randomId}` } style={ { display: showScrollBar ? 'block' : 'none' } }>
          <div className="alipayScroll-scrollBar" id={ `alipayScroll-scrollBar-${this.randomId}` } />
        </div>
      </div>
    )
  }
}

export default AliPayScroll