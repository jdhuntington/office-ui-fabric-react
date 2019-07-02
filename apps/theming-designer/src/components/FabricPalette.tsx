import * as React from 'react';
import { FabricSlots, IThemeRules } from 'office-ui-fabric-react/lib/ThemeGenerator';
import { MainPanelInnerContent } from '../shared/MainPanelStyles';
import { mergeStyles } from '@uifabric/merge-styles';
import { Stack, Text } from 'office-ui-fabric-react';
import { ColorPicker } from 'office-ui-fabric-react/lib/ColorPicker';
import { Callout } from 'office-ui-fabric-react/lib/Callout';
import { IColor } from 'office-ui-fabric-react/lib/Color';

export interface IFabricPaletteProps {
  themeRules?: IThemeRules;
  onFabricPaletteColorChange: (newColor: IColor | undefined, fabricSlot: FabricSlots) => void;
}

const tableClassName = mergeStyles({
  width: '100%',
  selectors: {
    thead: {
      textAlign: 'center'
    },
    tr: {
      padding: 80,
      textAlign: 'left'
    },
    th: {
      display: 'table-cell'
    },
    td: {
      padding: 10,
      textAlign: 'left',
      display: 'table-cell'
    }
  }
});

const slotClassName = mergeStyles({
  display: 'flex',
  alignItems: 'center',
  overflow: 'auto'
});

const fabricPaletteColorBox = mergeStyles({
  width: 15,
  height: 15,
  display: 'inline-block',
  left: 5,
  top: 5,
  border: '1px solid black',
  flexShrink: 0
});

interface FabricSlotWidgetProps {
  slot: FabricSlots;
  onFabricPaletteColorChange: (newColor: IColor | undefined, fabricSlot: FabricSlots) => void;
  themeRules?: IThemeRules;
}

const FabricSlotWidget: React.FunctionComponent<FabricSlotWidgetProps> = (props: FabricSlotWidgetProps) => {
  const [isPickerOpen, setIsPickerOpen] = React.useState(false);
  const ref = React.createRef<HTMLDivElement>();
  const slotRule = props.themeRules[FabricSlots[props.slot]];
  return (
    <div key={slotRule.name} className={slotClassName}>
      <Stack horizontal gap={5}>
        <div
          ref={ref}
          key={slotRule.name}
          className={fabricPaletteColorBox}
          style={{ backgroundColor: slotRule.color!.str }}
          onClick={() => setIsPickerOpen(true)}
        />
        <div>{slotRule.name}</div>
        {isPickerOpen && (
          <div>
            <Callout gapSpace={10} target={ref.current} setInitialFocus={true} onDismiss={() => setIsPickerOpen(false)}>
              <ColorPicker
                color={slotRule.color}
                onChange={(ev, newColor) => props.onFabricPaletteColorChange(newColor, props.slot)}
                alphaSliderHidden={true}
              />
            </Callout>
          </div>
        )}
      </Stack>
    </div>
  );
};

export class FabricPalette extends React.Component<IFabricPaletteProps, {}> {
  private _colorPickerRef = React.createRef<HTMLDivElement>();
  constructor(props: IFabricPaletteProps) {
    super(props);
    this.state = {
      isColorPickerVisible: false
      // currentFabricSlot: FabricSlots.themeDark
    };

    this._updateColorPickerVisible = this._updateColorPickerVisible.bind(this);
    this._onCalloutDismiss = this._onCalloutDismiss.bind(this);
    this._onColorPickerChange = this._onColorPickerChange.bind(this);
  }

  public render() {
    return (
      <div className={MainPanelInnerContent}>
        <table className={tableClassName}>
          <thead>
            <tr>
              <Text as="th"> Primary</Text>
              <Text as="th"> Hex</Text>
              <Text as="th"> Foreground</Text>
              <Text as="th"> Hex</Text>
              <Text as="th"> Background</Text>
              <Text as="th"> Hex</Text>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Text as="td">
                <FabricSlotWidget
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.themeDarker}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                />
              </Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.themeDarker]].color!.str}</Text>
              <Text as="td">
                <FabricSlotWidget
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.black}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                />
              </Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.black]].color!.str}</Text>
              <Text as="td">
                <FabricSlotWidget
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.neutralTertiaryAlt}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                />
              </Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.neutralTertiaryAlt]].color!.str}</Text>
            </tr>
            <tr>
              <Text as="td">
                <FabricSlotWidget
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.themeDark}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                />
              </Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.themeDark]].color!.str}</Text>
              <Text as="td">
                <FabricSlotWidget
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.neutralDark}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                />
              </Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.neutralDark]].color!.str}</Text>
              <Text as="td">
                <FabricSlotWidget
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.neutralQuaternary}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                />
              </Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.neutralQuaternary]].color!.str}</Text>
            </tr>
            <tr>
              <Text as="td">
                <FabricSlotWidget
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.themeDarkAlt}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                />
              </Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.themeDarkAlt]].color!.str}</Text>
              <Text as="td">
                <FabricSlotWidget
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.neutralPrimary}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                />
              </Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.neutralPrimary]].color!.str}</Text>
              <Text as="td">
                <FabricSlotWidget
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.neutralQuaternaryAlt}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                />
              </Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.neutralQuaternaryAlt]].color!.str}</Text>
            </tr>
            <tr>
              <Text as="td">
                <FabricSlotWidget
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.themePrimary}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                />
              </Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.themePrimary]].color!.str}</Text>
              <Text as="td">
                <FabricSlotWidget
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.neutralPrimaryAlt}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                />
              </Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.neutralPrimaryAlt]].color!.str}</Text>
              <Text as="td">
                <FabricSlotWidget
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.neutralLight}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                />
              </Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.neutralLight]].color!.str}</Text>
            </tr>
            <tr>
              <Text as="td">
                <FabricSlotWidget
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.themeSecondary}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                />
              </Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.themeSecondary]].color!.str}</Text>
              <Text as="td">
                <FabricSlotWidget
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.neutralSecondary}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                />
              </Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.neutralSecondary]].color!.str}</Text>
              <Text as="td">
                <FabricSlotWidget
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.neutralLighter}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                />
              </Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.neutralLighter]].color!.str}</Text>
            </tr>
            <tr>
              <Text as="td">
                <FabricSlotWidget
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.themeTertiary}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                />
              </Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.themeTertiary]].color!.str}</Text>
              <Text as="td">
                <FabricSlotWidget
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.neutralTertiary}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                />
              </Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.neutralTertiaryAlt]].color!.str}</Text>
              <Text as="td">
                <FabricSlotWidget
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.neutralLighterAlt}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                />
              </Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.neutralLighterAlt]].color!.str}</Text>
            </tr>
            <tr>
              <Text as="td">
                <FabricSlotWidget
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.themeLight}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                />
              </Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.themeLight]].color!.str}</Text>
              <Text as="td">
                <FabricSlotWidget
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.white}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                />
              </Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.white]].color!.str}</Text>
            </tr>
            <tr>
              <Text as="td">
                <FabricSlotWidget
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.themeLighter}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                />
              </Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.themeLighter]].color!.str}</Text>
            </tr>
            <tr>
              <Text as="td">
                <FabricSlotWidget
                  themeRules={this.props.themeRules!}
                  slot={FabricSlots.themeLighterAlt}
                  onFabricPaletteColorChange={this.props.onFabricPaletteColorChange}
                />
              </Text>
              <Text as="td">{this.props.themeRules![FabricSlots[FabricSlots.themeLighterAlt]].color!.str}</Text>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  private _updateColorPickerVisible() {
    this.setState({ isColorPickerVisible: true });
  }

  private _onColorPickerChange(ev: any, color: IColor) {
    console.log('hello');
    this.props.onFabricPaletteColorChange(color, FabricSlots.themeDark);
  }

  private _onCalloutDismiss() {
    this.setState({ isColorPickerVisible: false });
  }
}
