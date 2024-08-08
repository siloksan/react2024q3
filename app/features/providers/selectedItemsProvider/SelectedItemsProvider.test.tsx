import { act, renderHook } from '@testing-library/react';

import { DUMMY_SPACECRAFTS_RESPONSE } from '~/shared/api/mock/mocks/dummyData/dummySpaceCraftsResponse';
import { SelectedItemsProvider, useSelectedItems, useSelectedItemsUpdate } from './SelectedItemsProvider';

describe('SelectedItemsProvider', () => {
  it('should add selected item', () => {
    const spacecraft = DUMMY_SPACECRAFTS_RESPONSE.spacecrafts[0];

    const { result } = renderHook(
      () => ({
        items: useSelectedItems(),
        update: useSelectedItemsUpdate(),
      }),
      {
        wrapper: SelectedItemsProvider,
      }
    );

    act(() => {
      result.current.update.addSelectedItem(spacecraft);
    });

    expect(result.current.items).toEqual([spacecraft]);
  });

  it('should remove selected item', () => {
    const spacecraft1 = DUMMY_SPACECRAFTS_RESPONSE.spacecrafts[0];
    const spacecraft2 = DUMMY_SPACECRAFTS_RESPONSE.spacecrafts[1];
    const { result } = renderHook(
      () => ({
        items: useSelectedItems(),
        update: useSelectedItemsUpdate(),
      }),
      {
        wrapper: SelectedItemsProvider,
      }
    );

    act(() => {
      result.current.update.addSelectedItem(spacecraft1);
      result.current.update.addSelectedItem(spacecraft2);
    });

    act(() => {
      result.current.update.removeSelectedItem(spacecraft1);
    });

    expect(result.current.items).toEqual([spacecraft2]);
  });

  it('should clear selected items', () => {
    const spacecraft = DUMMY_SPACECRAFTS_RESPONSE.spacecrafts[0];
    const { result } = renderHook(
      () => ({
        items: useSelectedItems(),
        update: useSelectedItemsUpdate(),
      }),
      {
        wrapper: SelectedItemsProvider,
      }
    );

    act(() => {
      result.current.update.addSelectedItem(spacecraft);
    });

    act(() => {
      result.current.update.clearSelectedItems();
    });

    expect(result.current.items).toEqual([]);
  });
});
