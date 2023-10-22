// import libWrapperShared from "./libWrapperShared.js";

export default class ChatMerge {
  static get _enabled() {
    return true;
  }
  static get _epoch() {
    return 10;
  }
  static get _allowRolls() {
    return "rolls";
  }
  static get _separateWithBorder() {
    return false;
  }
  static get _showHover() {
    return false;
  }
  static get _showHeader() {
    return false;
  }

  static init() {
    // libWrapperShared.register("ChatLog.prototype.deleteMessage", this._deleteMessage.bind(this));
    Hooks.on("renderChatMessage", this._renderChatMessage);
    Hooks.on("deleteChatMessage", this.deleteMessage);
  }

  static ready() {
    const style = document.querySelector(":root").style;
    // style.setProperty("--dfce-cm-separation", this._separateWithBorder ? "" : "0");
    // this._showHover
    //   ? style.removeProperty("--dfce-cm-hover-shadow")
    //   : style.setProperty("--dfce-cm-hover-shadow", "0px");
    // style.setProperty("--dfce-cm-header", this._showHeader ? "" : "none");
    // if (game.user.isGM) {
    //   style.setProperty("--dfce-cm-header-delete", this._showHeader ? "" : "0");
    //   style.setProperty("--dfce-cm-header-delete-pad", this._showHeader ? "" : "16px");
    // }
    this._processAllMessage(ui.chat.element);
    Hooks.on("renderChatLog", (_, html) => this._processAllMessage(html));
  }

  static deleteMessage(message, flags) {
    if (flags.deleteAll === true) return;
    const messageId = message._id;
    const element = document.querySelector(`li[data-message-id="${messageId}"`);
    // If we were a TOP
    if (element?.classList?.contains("dfce-cm-top")) {
      element.classList.remove("dfce-cm-top");
      // If the next element was a middle, make it a top
      if (element.nextElementSibling.classList.contains("dfce-cm-middle")) {
        element.nextElementSibling.classList.remove("dfce-cm-middle");
        element.nextElementSibling.classList.add("dfce-cm-top");
      }
      // Otherwise, it was a bottom and should now become a normal message again
      else element.nextElementSibling.classList.remove("dfce-cm-bottom");
    }
    // If we were a BOTTOM
    else if (element?.classList?.contains("dfce-cm-bottom")) {
      element.classList.remove("dfce-cm-bottom");
      // If the previous element was a middle, make it a bottom
      if (element.previousElementSibling.classList.contains("dfce-cm-middle")) {
        element.previousElementSibling.classList.remove("dfce-cm-middle");
        element.previousElementSibling.classList.add("dfce-cm-bottom");
      }
      // Otherwise, it was a top and should now become a normal message again
      else element.previousElementSibling.classList.remove("dfce-cm-top");
    }
    // If we were a MIDDLE, let the above and below snug and they'll be fine
    else if (element?.classList?.contains("dfce-cm-middle")) element.classList.remove("dfce-cm-middle");
  }

  // static _deleteMessage(wrapper, messageId, { deleteAll = false } = {}) {
  //   // Ignore the Delete All process. Everything is being obliterated, who cares about the styling
  //   if (!deleteAll && this._enabled) {
  //     const element = document.querySelector(`li[data-message-id="${messageId}"`);
  //     // If we were a TOP
  //     if (element?.classList?.contains("dfce-cm-top")) {
  //       element.classList.remove("dfce-cm-top");
  //       // If the next element was a middle, make it a top
  //       if (element.nextElementSibling.classList.contains("dfce-cm-middle")) {
  //         element.nextElementSibling.classList.remove("dfce-cm-middle");
  //         element.nextElementSibling.classList.add("dfce-cm-top");
  //       }
  //       // Otherwise, it was a bottom and should now become a normal message again
  //       else element.nextElementSibling.classList.remove("dfce-cm-bottom");
  //     }
  //     // If we were a BOTTOM
  //     else if (element?.classList?.contains("dfce-cm-bottom")) {
  //       element.classList.remove("dfce-cm-bottom");
  //       // If the previous element was a middle, make it a bottom
  //       if (element.previousElementSibling.classList.contains("dfce-cm-middle")) {
  //         element.previousElementSibling.classList.remove("dfce-cm-middle");
  //         element.previousElementSibling.classList.add("dfce-cm-bottom");
  //       }
  //       // Otherwise, it was a top and should now become a normal message again
  //       else element.previousElementSibling.classList.remove("dfce-cm-top");
  //     }
  //     // If we were a MIDDLE, let the above and below snug and they'll be fine
  //     else if (element?.classList?.contains("dfce-cm-middle")) element.classList.remove("dfce-cm-middle");
  //   }
  //   return wrapper(messageId, { deleteAll });
  // }

  static _processAllMessage(element) {
    element = element ?? $(document.body);
    // Remove the old CSS class designations
    element.find(".dfce-cm-top").removeClass("dfce-cm-top");
    element.find(".dfce-cm-middle").removeClass("dfce-cm-middle");
    element.find(".dfce-cm-bottom").removeClass("dfce-cm-bottom");
    // If we are disabled, return
    if (!ChatMerge._enabled) return;
    // Collect all rendered chat messages
    const messages = element.find("li.chat-message");
    // Return if there are no messages rendered
    if (messages.length === 0) return;
    // Make sure to set the hover colour for the first message since we skip it in the processor below.
    if (messages[0].hasAttribute("style")) {
      messages[0].style.setProperty("--dfce-mc-border-color", messages[0].style.borderColor);
    }
    // Process each message after the first
    for (let c = 1; c < messages.length; c++) {
      // Update styling of the chat messages
      this._styleChatMessages(
        game.messages.get(messages[c].getAttribute("data-message-id")),
        messages[c],
        game.messages.get(messages[c - 1].getAttribute("data-message-id")),
        messages[c - 1]
      );
    }
  }

  static _renderChatMessage(message, html, _cmd) {
    if (!ChatMerge._enabled) return;
    // Find the most recent message in the chat log
    const partnerElem = $(`li.chat-message`).last()[0];
    // If there is no message, return
    if (partnerElem === null || partnerElem === undefined) return;
    // get the ChatMessage document associated with the html
    const partner = game.messages.get(partnerElem.getAttribute("data-message-id"));
    if (!message || !partner) return;
    // Update styling of the chat messages
    ChatMerge._styleChatMessages(message, html[0], partner, partnerElem);
  }

  static _inTimeFrame(current, previous) {
    return current > previous && current - previous < this._epoch * 1000;
  }

  static _isValidMessage(current, previous) {
    const rolls = this._allowRolls;
    // const splitSpeaker = SETTINGS.get < boolean > this.PREF_SPLIT_SPEAKER;
    const splitSpeaker = true;
    let userCompare = false;
    const currData = current ?? current;
    const prevData = previous ?? previous;
    if (splitSpeaker) {
      // this is a bit complex, basically we want to group by actors, but if you're not using an actor, group by user instead
      userCompare =
        // If actors are equal and NOT null
        (currData.speaker.actor === prevData.speaker.actor && !!currData.speaker.actor) || // If BOTH actors are null and users are equal
        (!currData.speaker.actor && !prevData.speaker.actor && currData.user === prevData.user);
    } else {
      // If we are not splitting by speaker, just do the simple option of comparing the users
      userCompare = currData.user === prevData.user;
    }
    return (
      userCompare &&
      this._inTimeFrame(currData.timestamp, prevData.timestamp) &&
      // Check for merging with roll types
      (rolls === "all" ||
        (rolls === "rolls" && current.isRoll === previous.isRoll) ||
        (rolls === "none" && !current.isRoll && !previous.isRoll))
    );
  }

  static _styleChatMessages(curr, currElem, prev, prevElem) {
    if (currElem.hasAttribute("style")) {
      currElem.style.setProperty("--dfce-mc-border-color", currElem.style.borderColor);
    }

    if (!ChatMerge._isValidMessage(curr, prev)) return;
    if (prevElem.classList.contains("dfce-cm-bottom")) {
      prevElem.classList.remove("dfce-cm-bottom");
      prevElem.classList.add("dfce-cm-middle");
    } else prevElem.classList.add("dfce-cm-top");
    currElem.classList.add("dfce-cm-bottom");
  }
}
