import {f7} from "framework7-react"
import {List} from 'framework7-react'

/**
 * SignUp popup as a class
 */
export default class SignUp {
  /**
   * To use SignUp, must pass useRef and useState
   * @param popupOpened
   * @param setPopupOpened
   * @param popup_instance
   */
  constructor(popupOpened, setPopupOpened, popup_instance) {
    this.popup_opened = popupOpened
    this.set_popup_opened = setPopupOpened
    this.popup = popup_instance
    this.zsdf = 'zsdf text initialized'
    console.log(`my popup: `, this.popup)
  }
  test() {
    alert(this.zsdf)
  }
  show() {
    if (!this.popup) {
      console.error(`use ref undefined?`)
      return false
    }
    this.popup.current = f7.popup.create({
        content: `
          <div class="popup">
            <div class="page">
              <div class="navbar">
                <div class="navbar-inner">
                  <div class="navbar-bg"></div>
                  <div class="title">Sign Up to SDE</div>
                  <div class="right"><a  class="link popup-close">Close</a></div>
                </div>
              </div>
              <div class="page-content">
                <div class="block">
                asdf
<!--                  <BlockTitle>Inputs + Additional Info</BlockTitle>-->
                  <List strongIos dividersIos insetIos>
                    <ListInput type="text" placeholder="Your name" info="Full name please" clearButton />
                    <ListInput type="password" placeholder="Your password" info="8 characters minimum" clearButton />
                    <ListInput type="email" placeholder="Your e-mail" info="Your work e-mail address" clearButton />
                  </List>
                </div>
              </div>
            </div>
          </div>
        `.trim(),
      })
    // }
    // Open it
    this.popup.current.open();
  }
}
