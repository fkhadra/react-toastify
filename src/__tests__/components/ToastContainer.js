/* eslint-env jest */
import React from "react";
import { mount } from "enzyme";

import ToastContainer from "./../../components/ToastContainer";
import toast from "./../../toast";

import { ACTION, eventManager } from "./../../utils";

function hasProp(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

// extract props from component instance
function getToastProps(component) {
  const collection = component.instance().collection;
  const toast = collection[Object.keys(collection)[0]];

  return toast.options;
}

beforeEach(() => {
  jest.useFakeTimers();
});

describe("ToastContainer", () => {
  it("Should bind event when mounted and unbind them when unmounted", () => {
    const component = mount(<ToastContainer />);

    expect(eventManager.list.has(ACTION.SHOW)).toBeTruthy();
    expect(eventManager.list.has(ACTION.CLEAR)).toBeTruthy();

    component.unmount();
    jest.runAllTimers();

    expect(eventManager.list.has(ACTION.SHOW)).toBeFalsy();
    expect(eventManager.list.has(ACTION.CLEAR)).toBeFalsy();
  });

  it("Should bind event when re-mounted", () => {
    const component = mount(<ToastContainer />);

    expect(eventManager.list.has(ACTION.SHOW)).toBeTruthy();
    expect(eventManager.list.has(ACTION.CLEAR)).toBeTruthy();

    component.unmount().mount();
    jest.runAllTimers();

    expect(eventManager.list.has(ACTION.SHOW)).toBeTruthy();
    expect(eventManager.list.has(ACTION.CLEAR)).toBeTruthy();
  });

  it(`Should always pass down to Toast the props: 
    -autoClose
    -closeButton
    -position
    -pauseOnHover
    -transition
    -closeToast
    -role`, () => {
    const component = mount(<ToastContainer />);
    // Create a toast
    toast("coucou");
    jest.runAllTimers();
    const props = getToastProps(component);

    [
      "autoClose",
      "closeButton",
      "position",
      "closeToast",
      "transition",
      "pauseOnHover",
      "role"
    ].forEach(key => expect(hasProp(props, key)).toBeTruthy());
  });

  it("Should clear all toast when clear is called without id", () => {
    const component = mount(<ToastContainer />);

    toast("coucou");
    toast("coucou");
    jest.runAllTimers();
    expect(component.state().toast).toHaveLength(2);

    toast.dismiss();
    jest.runAllTimers();

    expect(component.state().toast).toHaveLength(0);
  });

  it("Should dismiss toast with id == 0 only", () => {
    const component = mount(<ToastContainer />);

    toast("toast id 0", {
      toastId: 0
    });
    toast("toast id 1", {
      toastId: 1
    });

    jest.runAllTimers();

    expect(component.state().toast).toHaveLength(2);

    toast.dismiss(0);
    jest.runAllTimers();

    expect(component.state().toast).toHaveLength(1);
    expect(component.state().toast).not.toContain(0);
  });

  it("Should prevent duplicate toast when same id is used", () => {
    const component = mount(<ToastContainer />);

    toast("REAL_TOAST", {
      toastId: "foo"
    });
    toast("DUPLICATE_TOAST", {
      toastId: "foo"
    });

    jest.runAllTimers();
    const content = component.html();
    expect(component.state().toast).toHaveLength(1);
    expect(content).toMatch(/REAL_TOAST/);
    expect(content).not.toMatch(/FAKE_TOAST/);
  });

  it("Should be able to render a react element, a string, a number, a render props without crashing", () => {
    const component = mount(<ToastContainer />);
    toast("coucou");
    toast(123);
    toast(<div>plop</div>);
    toast(() => <div>plop</div>);
    jest.runAllTimers();

    expect(component.state().toast).toHaveLength(4);
  });

  it("Should be able to display new toast on top", () => {
    /*eslint no-extend-native: 0 */
    Array.prototype.reverse = jest.fn(Array.prototype.reverse);
    mount(<ToastContainer newestOnTop />);

    expect(Array.prototype.reverse).toHaveBeenCalled();
  });

  it("Toast options should supersede ToastContainer props", () => {
    const component = mount(<ToastContainer />);
    const CloseBtn = () => <div>Close</div>;
    const fn = () => {};
    const desiredProps = {
      pauseOnHover: false,
      closeOnClick: false,
      onOpen: fn,
      onClose: fn,
      autoClose: false,
      hideProgressBar: true,
      position: "top-left",
      closeButton: <CloseBtn />,
      role: "status"
    };

    toast("hello", desiredProps);
    jest.runAllTimers();

    const props = getToastProps(component);

    expect(props).toMatchObject(desiredProps);
  });

  it("Should pass closeToast function and type when using a custom CloseButton", () => {
    const component = mount(<ToastContainer />);
    const CloseBtn = () => <div>x</div>;
    const Msg = () => <div>Plop</div>;

    toast(<Msg />, {
      closeButton: CloseBtn
    });
    jest.runAllTimers();

    const props = getToastProps(component);
    expect(Object.keys(props.closeButton.props)).toMatchObject([
      "ariaLabel",
      "closeToast",
      "type"
    ]);
  });

  it("Should be able to disable the close button", () => {
    let component = mount(<ToastContainer />);
    toast("hello");
    jest.runAllTimers();

    // ensure that close button is present by default
    expect(component.html()).toMatch(/✖/);
    toast("hello", {
      closeButton: false
    });

    jest.runAllTimers();
    expect(component.html()).not.toMatch(/toastify__close/);
  });

  // TODO: rewrite this test properly.
  it("Should be able to delay toast rendering", () => {
    const component = mount(<ToastContainer />);
    toast("hello", { delay: 1000 });

    jest.runAllTimers();

    expect(component.html()).toMatch("hello");
  });

  it("Should use default CloseButton when toast option set to true and ToastContainer options is false", () => {
    // set closeButton to false to remove it by default
    let component = mount(<ToastContainer closeButton={false} />);
    toast("hello");
    jest.runAllTimers();

    // ensure that close button is NOT present by default
    expect(component.html()).not.toMatch(/✖/);
    toast("hello", { closeButton: true });
    jest.runAllTimers();

    // now the close button should be present
    expect(component.html()).toMatch(/✖/);
  });

  it("Should use custom CloseButton when toast option set to true and ToastContainer options is custom", () => {
    // set closeButton to false to remove it by default
    const CloseBtn = () => <div>CUSTOM_BUTTON</div>;
    let component = mount(<ToastContainer closeButton={<CloseBtn />} />);
    toast("hello");
    jest.runAllTimers();

    // ensure that close button is NOT present by default
    expect(component.html()).toMatch(/CUSTOM_BUTTON/);
    toast("hello", { closeButton: true });
    jest.runAllTimers();

    // now the close button should be present
    expect(component.html()).toMatch(/CUSTOM_BUTTON/);
    expect(component.html()).not.toMatch(/✖/);
  });

  it("Should merge className and style", () => {
    const component = mount(
      <ToastContainer className="foo" style={{ background: "red" }} />
    );
    toast("hello");
    jest.runAllTimers();

    expect(component.html()).toMatch(/class=".+foo"/);
    expect(component.html()).toMatch(/style="background: red;"/);
  });

  // Most of css-in-js use toString to translate to className
  it("Should support css-in-js rules", () => {
    const className = {
      background: "purple",
      toString() {
        return "random-class-name";
      }
    };

    const component = mount(
      <ToastContainer className={className} style={{ background: "red" }} />
    );

    toast("hello");
    jest.runAllTimers();

    expect(component.html()).toMatch(/class=".+random-class-name"/);
  });

  it("Should pass a closeToast function when displaying a react component", () => {
    const component = mount(<ToastContainer />);
    const Msg = () => <div>Plop</div>;

    toast(<Msg />);
    jest.runAllTimers();

    const props = getToastProps(component);

    expect(props).toHaveProperty("closeToast");
  });

  describe("closeToast function", () => {
    it("Should remove toast when closeToast is called", () => {
      const component = mount(<ToastContainer />);
      const Msg = () => <div>Plop</div>;

      toast(<Msg />);
      jest.runAllTimers();

      let props = getToastProps(component);

      //ensure that the toast is present
      expect(component.state().toast).toHaveLength(1);

      // close the toast with the function passed to the close button
      props.closeToast();

      expect(component.state().toast).toHaveLength(0);

      //do the same but with the closeButton this time
      toast(<Msg />);
      jest.runAllTimers();

      props = getToastProps(component);

      //ensure that the toast is present
      expect(component.state().toast).toHaveLength(1);

      // close the toast with the function passed to the close button
      props.closeButton.props.closeToast();

      expect(component.state().toast).toHaveLength(0);
    });
  });

  it("Should include only the style needed for a given position", () => {
    Object.keys(toast.POSITION).forEach(k => {
      const component = mount(<ToastContainer position={toast.POSITION[k]} />);
      const id = toast("test");
      jest.runAllTimers();

      expect(component.instance().collection[id].position).toBe(
        toast.POSITION[k]
      );
    });
  });

  describe("Multiple container support", () => {
    describe("Disabled", () => {
      it("Should render toasts in all container", () => {
        const toastContainerComponent1 = mount(
          <ToastContainer enableMultiContainer={false} />
        );
        const toastContainerComponent2 = mount(<ToastContainer />);
        const toastContainerComponent3 = mount(
          <ToastContainer containerId={1} />
        );

        toast("Toast 1");
        toast("Toast 2", { containerId: 1 });
        jest.runAllTimers();

        expect(toastContainerComponent1.state().toast).toHaveLength(2);
        expect(toastContainerComponent2.state().toast).toHaveLength(2);
        expect(toastContainerComponent3.state().toast).toHaveLength(2);
      });
    });

    describe("Enabled", () => {
      describe("With containerId", () => {
        it("Should show only related toasts aka- same containerId and containerId", () => {
          const toastContainerComponent1 = mount(
            <ToastContainer containerId={1} enableMultiContainer />
          );
          const toastContainerComponent2 = mount(
            <ToastContainer containerId={2} enableMultiContainer />
          );

          toast("Toast with containerId 1", { containerId: 1 });
          toast("Toast with containerId 2", { containerId: 2 });
          toast("Another toast with containerId 2", { containerId: 2 });
          jest.runAllTimers();

          expect(toastContainerComponent1.state().toast).toHaveLength(1);
          expect(toastContainerComponent2.state().toast).toHaveLength(2);
        });

        it("Should not display unrelated toasts", () => {
          const toastContainerComponent = mount(
            <ToastContainer containerId={1} enableMultiContainer />
          );

          toast("Toast with containerId 1", { containerId: 2 });
          toast("Toast with containerId 2", { containerId: 2 });
          jest.runAllTimers();

          expect(toastContainerComponent.state().toast).toHaveLength(0);
        });
      });

      describe("Has no containerId", () => {
        it("Should display toasts with no containerId", () => {
          const toastContainerComponent = mount(
            <ToastContainer enableMultiContainer />
          );

          toast("Toast");
          jest.runAllTimers();

          expect(toastContainerComponent.state().toast).toHaveLength(1);
        });

        it("Should not display any toasts with containerId", () => {
          const toastContainerComponent = mount(
            <ToastContainer enableMultiContainer />
          );

          toast("Toast", { containerId: 1 });
          jest.runAllTimers();

          expect(toastContainerComponent.state().toast).toHaveLength(0);
        });
      });
    });
  });

  it("Should be able run toast even when document is not visible", () => {
    document.addEventListener = jest.fn();
    mount(<ToastContainer pauseOnVisibilityChange={false} />);
    const ev = new Event("visibilitychange");
    document.dispatchEvent(ev);

    expect(document.addEventListener).not.toHaveBeenCalled();
  });

  // ⚠️ This test should be the last one until I expose an api to clear the toast stack ⚠️
  it("Should throw an error if can't render a toast", () => {
    expect(() => {
      mount(<ToastContainer />);
      toast(false);
      jest.runAllTimers();
    }).toThrow(/The element you provided cannot be rendered/);
  });
});
