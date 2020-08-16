import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, fireEvent, RenderResult } from '@testing-library/react';
import '../__mocks__/react-transition-group';

import { createToastManager, useToastManager } from '../../src/core';

jest.useFakeTimers();

enum TestId {
  Notification = 'notif',
  FirstTriggerBtn = 'button-a',
  FirstClearAllBtn = 'clear-all-a',
  SecondTriggerBtn = 'button-b',
  SecondCloseBtn = 'close-b-notif'
}

const FirstInnerComponent = () => {
  const toast = useToastManager();

  return (
    <div>
      <button
        data-testid={TestId.FirstClearAllBtn}
        onClick={() => toast.dismiss()}
      >
        Clear A
      </button>
      <button
        data-testid={TestId.FirstTriggerBtn}
        onClick={() => toast(<div data-testid={TestId.Notification}>Notify A</div>)}
      >
        Notify for A
      </button>
    </div>
  );
};

const SecondInnerComponent = () => {
  const toast = useToastManager();

  return (
    <div>
      <button
        data-testid={TestId.SecondTriggerBtn}
        onClick={() =>
          toast(<div data-testid={TestId.Notification}>Notify B</div>)
        }
      >
        Notify for A
      </button>
    </div>
  );
};

describe('ToastManager', () => {
  let rr: RenderResult;
  let firstToastManager: ReturnType<typeof createToastManager>;
  let secondToastManager: ReturnType<typeof createToastManager>;

  beforeEach(() => {
    firstToastManager = createToastManager();
    secondToastManager = createToastManager();

    rr = render(
      <div>
        <firstToastManager.Provider>
          <div>
            First sub three
            <FirstInnerComponent />
          </div>
        </firstToastManager.Provider>

        <secondToastManager.Provider
          closeButton={({ closeToast }) => (
            <button data-testid={TestId.SecondCloseBtn} onClick={closeToast}>
              Close A
            </button>
          )}
        >
          <div>
            Second sub three
            <SecondInnerComponent />
          </div>
        </secondToastManager.Provider>
      </div>
    );
  });

  it('should show toaster using old api', () => {
    act(() => {
      firstToastManager(
        <div data-testid={TestId.Notification}>Some notification</div>
      );
      jest.runTimersToTime(0);
    });

    expect(rr.getByTestId(TestId.Notification).textContent).toContain(
      'Some notification'
    );
  });

  it('should show toaster using manager api', () => {
    act(() => {
      fireEvent.click(rr.getByTestId(TestId.FirstTriggerBtn));
      jest.runTimersToTime(0);
    });

    expect(rr.getByTestId(TestId.Notification).textContent).toEqual('Notify A');
  });

  it('should show toasters from both managers', () => {
    act(() => {
      fireEvent.click(rr.getByTestId(TestId.FirstTriggerBtn));
      fireEvent.click(rr.getByTestId(TestId.SecondTriggerBtn));
      jest.runTimersToTime(0);
    });

    const texts = rr
      .getAllByTestId(TestId.Notification)
      .map(el => el.textContent);

    expect(texts).toHaveLength(2);
    expect(texts).toContain('Notify A');
    expect(texts).toContain('Notify B');
  });

  it('should dismiss first toast via clear all and keep second', () => {
    act(() => {
      fireEvent.click(rr.getByTestId(TestId.FirstTriggerBtn));
      fireEvent.click(rr.getByTestId(TestId.SecondTriggerBtn));
      jest.runTimersToTime(0);
      fireEvent.click(rr.getByTestId(TestId.FirstClearAllBtn));
      jest.runTimersToTime(0);
    });

    expect(rr.getByTestId(TestId.Notification).textContent).toEqual('Notify B');
  });

  it('should be able to close second toast via button defined in provider prop', () => {
    act(() => {
      fireEvent.click(rr.getByTestId(TestId.FirstTriggerBtn));
      fireEvent.click(rr.getByTestId(TestId.SecondTriggerBtn));
      jest.runTimersToTime(0);
      fireEvent.click(rr.getByTestId(TestId.SecondCloseBtn));
      jest.runTimersToTime(0);
    });

    expect(rr.getByTestId(TestId.Notification).textContent).toEqual('Notify A');
  });
});
