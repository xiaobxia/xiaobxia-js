/**
 * 模拟事件
 *
 * api地址
 * https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
 *
 * 其他事件对象
 * CompositionEvent
 * Event
 * EventListener
 * EventTarget
 * FocusEvent
 * InputEvent
 * KeyboardEvent
 * MouseScrollEvent
 * MouseWheelEvent
 * MutationEvent
 * ProgressEvent
 * UIEvent
 * WheelEvent
 */
var click = function (node) {
    var event = new MouseEvent("click");
    node.dispatchEvent(event);
}