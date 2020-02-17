import React from 'react';
import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';

// import '../__mocks__/react-transition-group';
import { cssClasses } from '../helpers';
import { eventManager, toast } from '../../src/core';
import { ContainerInstance } from '../../src/hooks';
import { RT_NAMESPACE } from '../../src/utils';
import { ToastId } from '../../src/types';
import { ToastContainer } from '../../src/components';

jest.useFakeTimers();

// Clear all previous event to avoid any clash between tests
beforeEach(() => {
  eventManager
    .off('show')
    .off('clear')
    .off('change');
});
const containerId = 'foo';
const containerInstance: ContainerInstance = {
  containerId,
  getToast: jest.fn(),
  isToastActive: jest.fn()
};

function expectContainerNotToBeMounted() {
  expect(document.querySelector(cssClasses.container)).toBe(null);
}

function expectContainerToBeMounted() {
  expect(document.querySelector(cssClasses.container)).not.toBe(null);
}

function unmountLazyContainer() {
  act(() => {
    eventManager.emit('willUnmount', containerInstance);
    jest.runAllTimers();
  });
  expectContainerNotToBeMounted();
}

describe('toastify', () => {
  it('Should lazy mount a ToastContainer if it is not mounted, when opt-in', () => {
    expectContainerNotToBeMounted();
    toast.configure({
      containerId
    });

    act(() => {
      toast('hello');
      jest.runAllTimers();
    });
    expectContainerToBeMounted();
    unmountLazyContainer();
  });

  it('Should mount only one ToastContainer when using lazy container', () => {
    expectContainerNotToBeMounted();
    toast.configure({
      containerId
    });
    act(() => {
      toast('hello');
      toast('hello');
      jest.runAllTimers();
    });

    expect(document.querySelectorAll(cssClasses.container)).toHaveLength(1);
    unmountLazyContainer();
  });

  it("Should be possible to configure the ToastContainer even when it's lazy mounted", () => {
    expectContainerNotToBeMounted();
    toast.configure({
      containerId,
      rtl: true
    });

    act(() => {
      toast('hello');
      jest.runAllTimers();
    });

    expectContainerToBeMounted();
    expect(
      document.querySelector(`.${RT_NAMESPACE}__toast-container--rtl`)
    ).not.toBe(null);
    unmountLazyContainer();
  });

  it('Should return a new id each time we emit a notification', () => {
    let firstId, secondId;

    firstId = toast('Hello');
    secondId = toast('Hello');

    expect(firstId).not.toEqual(secondId);
  });

  it('Should use the provided toastId from options', () => {
    const toastId = 11;
    const id = toast('Hello', { toastId });

    expect(id).toEqual(toastId);
  });

  it('Should allow the provided toastId from options to be a string', () => {
    const toastId = 'xxxx';
    const id = toast('Hello', { toastId });

    expect(id).toEqual(toastId);
  });

  it('Should not use the provided invalid toastId from options', () => {
    const toastId = (Symbol('myId') as unknown) as ToastId;
    const id = toast('Hello', { toastId });

    expect(id).not.toEqual(toastId);
  });

  describe('onChange event', () => {
    it('Should be able to track when toast is added or removed', () => {
      render(<ToastContainer />);
      const fn = jest.fn();
      toast.onChange(fn);

      expect(fn).not.toHaveBeenCalled();

      act(() => {
        toast('hello');
        jest.runAllTimers();
      });

      expect(fn).toHaveBeenCalled();
    });

    it('The callback should receive the number of toast displayed', done => {
      render(<ToastContainer />);
      toast.onChange(count => {
        expect(count).toBe(1);
        done();
      });

      act(() => {
        toast('hello');
        jest.runAllTimers();
      });
    });

    it('Should pass containerId as second arg if set', done => {
      render(<ToastContainer containerId="foo" />);
      toast.onChange((_count, containerId) => {
        expect(containerId).toBe('foo');
        done();
      });
      act(() => {
        toast('hello');
        jest.runAllTimers();
      });
    });
  });

  it('Should be able remove toast programmatically', () => {
    const { queryByText } = render(<ToastContainer />);
    let id: ToastId;
    act(() => {
      id = toast('hello');
      jest.runAllTimers();
    });

    expect(queryByText('hello')).not.toBe(null);

    act(() => {
      toast.dismiss(id);
      jest.runAllTimers();
    });

    expect(queryByText('hello')).toBe(null);
  });

  describe('update function', () => {
    it('Should be able to update an existing toast', () => {
      const { queryByText } = render(<ToastContainer />);
      let id: ToastId;

      act(() => {
        id = toast('hello');
        jest.runAllTimers();
      });

      expect(queryByText('hello')).not.toBe(null);

      act(() => {
        toast.update(id, {
          render: 'foobar'
        });
        jest.runAllTimers();
      });

      expect(queryByText('hello')).toBe(null);
      expect(queryByText('foobar')).not.toBe(null);
    });

    it('Should be able to update the same toast many times', () => {
      const { queryByText } = render(<ToastContainer />);
      let id: ToastId;

      act(() => {
        id = toast('hello');
        jest.runAllTimers();
      });

      expect(queryByText('hello')).not.toBe(null);

      act(() => {
        toast.update(id, {
          render: 'foobar'
        });
        jest.runAllTimers();
      });

      expect(queryByText('foobar')).not.toBe(null);

      act(() => {
        toast.update(id, {
          render: 'peace'
        });
        jest.runAllTimers();
      });

      expect(queryByText('peace')).not.toBe(null);
    });

    it('Should be able to update a Toast and keep the same content', () => {
      const { queryByText } = render(<ToastContainer />);
      let id: ToastId;
      act(() => {
        id = toast('hello');
        jest.runAllTimers();
      });

      expect(queryByText('hello')).not.toBe(null);

      act(() => {
        toast.update(id, {
          className: 'foobar'
        });
        jest.runAllTimers();
      });
      expect(queryByText('hello')).not.toBe(null);

      act(() => {
        toast.update(id);
        jest.runAllTimers();
      });
      expect(queryByText('hello')).not.toBe(null);
    });

    it('Should update a toast only if it exist and if the container is mounted', () => {
      const { queryByText } = render(<ToastContainer />);

      act(() => {
        toast.update(0, {
          render: 'hello'
        });
        jest.runAllTimers();
      });

      expect(queryByText('hello')).toBe(null);
    });

      // it('Should be able to update the toastId', () => {
      //   const { queryByText } = render(<ToastContainer />);
      //   let id:ToastId;
      //   const updateId = 'foo';
        
      //   act(() => {
      //     id = toast('hello');
      //     jest.runAllTimers();
      //   });

      //   expect(queryByText('hello')).not.toBe(null);

      //   act(() => {
      //     toast.update(id, {
      //       toastId: updateId
      //     });
      //     jest.runAllTimers();
      //   })
        
      //   expect(queryByText('hello')).not.toBe(null);

      //   act(() => {
      //     expect(toast.isActive(id)).toBe(false);
      //     expect(toast.isActive(updateId)).toBe(true);
      //   })
      // });

    //   it('Should be able to update a toast even when using multi containers', () => {
    //     const component = mount(
    //       <>
    //         <ToastContainer containerId="first" enableMultiContainer />
    //         <ToastContainer containerId="second" enableMultiContainer />
    //       </>
    //     );

    //     const firstId = toast('hello first', { containerId: 'first' });
    //     const secondId = toast('hello second', { containerId: 'second' });
    //     jest.runAllTimers();

    //     toast.update(firstId, {
    //       render: 'updated first',
    //       containerId: 'first'
    //     });

    //     toast.update(secondId, {
    //       render: 'updated second',
    //       containerId: 'second'
    //     });

    //     jest.runAllTimers();

    //     expect(component.first().html()).toMatch(/updated first/);
    //     expect(component.at(1).html()).toMatch(/updated second/);
    //   });
  });

  // describe('isActive function', () => {
  //   it('toast.isActive should return false until the container is mounted', () => {
  //     const isActive = toast.isActive();
  //     expect(isActive).toBe(false);
  //   });

  //   it('Should be able to tell if a toast is active based on the id as soon as the container is mounted', () => {
  //     mount(<ToastContainer />);
  //     const id = toast('hello');
  //     jest.runAllTimers();
  //     expect(toast.isActive(id)).toBe(true);
  //   });

  //   it('Should work with multi container', () => {
  //     mount(
  //       <>
  //         <ToastContainer containerId="first" enableMultiContainer />
  //         <ToastContainer containerId="second" enableMultiContainer />
  //       </>
  //     );

  //     const firstId = toast('hello first', { containerId: 'first' });
  //     const secondId = toast('hello second', { containerId: 'second' });
  //     jest.runAllTimers();

  //     expect(toast.isActive(firstId)).toBe(true);
  //     expect(toast.isActive(secondId)).toBe(true);
  //   });
  // });

  // it('Can append classNames', () => {
  //   const component = mount(<ToastContainer />);
  //   toast('hello', {
  //     className: 'class1',
  //     bodyClassName: 'class2',
  //     progressClassName: 'class3'
  //   });

  //   jest.runAllTimers();
  //   expect(component.render().find('.class1')).toHaveLength(1);
  //   expect(component.render().find('.class2')).toHaveLength(1);
  //   expect(component.render().find('.class3')).toHaveLength(1);
  // });

  // it('Should be able to use syntaxic sugar for different notification type', () => {
  //   const component = mount(<ToastContainer />);

  //   toast('plop');
  //   toast.success('plop');
  //   toast.error('plop');
  //   toast.warning('plop');
  //   toast.info('plop');
  //   toast.warn('plop');
  //   jest.runAllTimers();

  //   const html = component.html();

  //   Object.keys(TYPE).forEach(k => {
  //     expect(html.includes(`--${TYPE[k]}`)).toBe(true);
  //   });
  // });

  describe('Controlled progress bar', () => {
    it('Should be possible to use a controlled progress bar', () => {
      const { container } = render(<ToastContainer />);

      act(() => {
        toast('Hello', {
          progress: 0.5
        });
        jest.runAllTimers();
      });

      expect(container.innerHTML).toMatch(/transform:(\s)?scaleX\(0.5\)/);
    });

    it('When `toast.done` is called, it should set scaleX to 1', () => {
      const { container, queryByText } = render(<ToastContainer />);
      let id: ToastId;

      act(() => {
        id = toast('hello', {
          progress: 0.5
        });
        jest.runAllTimers();
      });

      expect(queryByText('hello')).not.toBe(null);
      act(() => {
        toast.done(id);
        jest.runAllTimers();
      });

      expect(container.innerHTML).toMatch(/transform:(\s)?scaleX\(1\)/);
    });
  });
});
