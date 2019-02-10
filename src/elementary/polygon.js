import {
  equals,
  length,
  pipe,
  prop,
  until,
} from 'ramda';
import neighborhoodsToRow from './neighborhoodsToRow';
import row from './row';

const setDefaultOuterState = ({ outerState = 0, ...props }) => ({
  ...props,
  outerState,
});

const setDefaultHeightToStartRowHeight = ({
  height,
  startRow,
  ...props
}) => ({
  ...props,
  startRow,
  height: height || length(startRow),
});

const initializeGeneratedFromStartRow = ({ startRow, ...props }) => ({
  ...props,
  generated: [[...startRow]],
});

const toNeighborhoodsToRow = ({ rule, ...props }) => ({
  ...props,
  neighborhoodsToRow: neighborhoodsToRow(rule),
});

const generatedLengthEqualsHeight = ({ generated, height }) => equals(
  height,
  length(generated),
);

const appendRow = ({
  generated,
  neighborhoodsToRow,
  outerState,
  vertices,
  ...props
}) => ({
  ...props,
  neighborhoodsToRow,
  outerState,
  vertices,
  generated: [
    ...generated,
    row({
      generated,
      neighborhoodsToRow,
      outerState,
      vertices,
    }),
  ],
});

const appendRowsUntilGeneratedLengthEqualsHeight = until(
  generatedLengthEqualsHeight,
  appendRow,
);

// TODO: Implement base-10 formatting
// TODO: Implement horizontal and vertical mirroring
const polygon = pipe(
  setDefaultOuterState,
  setDefaultHeightToStartRowHeight,
  initializeGeneratedFromStartRow,
  toNeighborhoodsToRow,
  appendRowsUntilGeneratedLengthEqualsHeight,
  prop('generated'),
);

export default polygon;
