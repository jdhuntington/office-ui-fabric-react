import {
  createFactory,
  getSlots,
  IDefaultSlotProps,
  ISlotCreator,
  ISlotDefinition,
  ISlottableProps,
  IStyleableComponentProps,
  ValidProps
} from '@uifabric/foundation';
import {
  IComponentOptions,
  IPartialSlotComponent,
  IRecompositionComponentOptions,
  ISlotComponent,
  IViewComponent
} from '@uifabric/foundation/lib/next/IComponent';
import { IFoundationComponent } from '@uifabric/foundation/lib/next/ISlots';
import { IStyleSet } from '@uifabric/styling';
import { assign } from '@uifabric/utilities';
import * as React from 'react';

interface IClassNamesMapNode {
  className?: string;
  map: IClassNamesMap;
}

interface IClassNamesMap {
  [key: string]: IClassNamesMapNode;
}

export function pseudoComposed<
  TComponentProps extends ValidProps & ISlottableProps<TComponentSlots>,
  TTokens,
  TStyleSet extends IStyleSet<TStyleSet>,
  TViewProps extends TComponentProps = TComponentProps,
  TComponentSlots = {},
  TStatics = {}
>(
  baseComponentOrOptions:
    | IFoundationComponent<TComponentProps, TTokens, TStyleSet, TViewProps, TComponentSlots, TStatics>
    | IComponentOptions<TComponentProps, TTokens, TStyleSet, TViewProps, TComponentSlots, TStatics> = {},
  recompositionOptions?: IRecompositionComponentOptions<TComponentProps, TTokens, TStyleSet, TViewProps, TComponentSlots, TStatics>
): IFoundationComponent<TComponentProps, TTokens, TStyleSet, TViewProps, TComponentSlots, TStatics> & TStatics {
  let options: IComponentOptions<TComponentProps, TTokens, TStyleSet, TViewProps, TComponentSlots, TStatics>;
  if (typeof baseComponentOrOptions === 'function' && baseComponentOrOptions.__options) {
    const baseComponentOptions = baseComponentOrOptions.__options;
    const recompositionSlots = recompositionOptions ? recompositionOptions.slots : undefined;

    options = {
      ...baseComponentOptions,
      ...recompositionOptions,
      slots: props => ({
        ...resolveSlots(baseComponentOptions.slots, props),
        ...resolveSlots(recompositionSlots, props)
      })
    };
  } else {
    options = baseComponentOrOptions;
  }

  const { factoryOptions = {}, view } = options;
  const { defaultProp } = factoryOptions;

  const result: IFoundationComponent<TComponentProps, TTokens, TStyleSet, TViewProps, TComponentSlots, TStatics> = buildComponent<
    TComponentProps,
    TTokens,
    TStyleSet,
    TViewProps,
    TComponentSlots,
    TStatics
  >(options, view);

  result.displayName = options.displayName || (view && view.name);

  // If a shorthand prop is defined, create a factory for the component.
  // TODO: This shouldn't be a concern of createComponent.. factoryOptions should just be forwarded.
  //       Need to weigh creating default factories on component creation vs. memoizing them on use in slots.tsx.
  if (defaultProp) {
    (result as ISlotCreator<TComponentProps, any>).create = createFactory(result, { defaultProp });
  }

  result.__options = options;

  assign(result, options.statics);

  return result as IFoundationComponent<TComponentProps, TTokens, TStyleSet, TViewProps, TComponentSlots, TStatics> & TStatics;
}

function buildComponent<
  TComponentProps extends ValidProps & ISlottableProps<TComponentSlots>,
  TTokens,
  TStyleSet extends IStyleSet<TStyleSet>,
  TViewProps extends TComponentProps = TComponentProps,
  TComponentSlots = {},
  TStatics = {}
>(
  options: IComponentOptions<TComponentProps, TTokens, TStyleSet, TViewProps, TComponentSlots, TStatics>,
  view: IViewComponent<TViewProps, TComponentSlots> | undefined
): IFoundationComponent<TComponentProps, TTokens, TStyleSet, TViewProps, TComponentSlots, TStatics> {
  return (
    componentProps: TViewProps &
      IStyleableComponentProps<TViewProps, TTokens, TStyleSet> & {
        children?: React.ReactNode;
      }
  ) => {
    const useState = options.state;
    if (useState) {
      componentProps = {
        ...componentProps,
        ...useState(componentProps)
      };
    }

    const viewProps = {
      ...componentProps
    } as TViewProps & IDefaultSlotProps<any>;
    if (!options.slots) {
      throw new Error(`Component ${options.displayName || (view && view.name) || ''} is missing slot definitions.`);
    }
    const Slots = typeof options.slots === 'function' ? getSlots(viewProps, options.slots(viewProps)) : getSlots(viewProps, options.slots);
    return view ? view(viewProps, Slots) : null;
  };
}

export function resolveSlots<TComponentProps extends ISlottableProps<TComponentSlots>, TComponentSlots>(
  slots: IPartialSlotComponent<TComponentProps, TComponentSlots> | ISlotComponent<TComponentProps, TComponentSlots> | undefined,
  data: TComponentProps
): ISlotDefinition<Required<TComponentSlots>> {
  const resolvedSlots = slots ? (typeof slots === 'function' ? slots(data) : slots) : {};
  return resolvedSlots as ISlotDefinition<Required<TComponentSlots>>;
}
