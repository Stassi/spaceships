import {
  gt,
  last,
  length,
  pipe,
  prop,
  slice,
  tail,
  until,
} from 'ramda';

const toPreviousRow = ({ generated, ...props }) => ({
  ...props,
  previousRow: last(generated),
});

const toPreviousRowWithOuterStates = ({
  outerState,
  previousRow,
  vertices,
  ...props
}) => ({
  ...props,
  previousRowWithOuterStates: vertices === 4 ? [
    outerState,
    ...previousRow,
    outerState,
  ] : [
    outerState,
    outerState,
    ...previousRow,
    outerState,
    outerState,
  ],
});

// TODO: replace previousRowWithOuterStates with slice addition counter
const appendNeighborhood = ({
  previousRowWithOuterStates,
  neighborhoods = [],
  ...props
}) => ({
  ...props,
  previousRowWithOuterStates,
  neighborhoods: [
    ...neighborhoods,
    slice(
      0,
      3,
      previousRowWithOuterStates,
    ),
  ],
});

const removePreviousRowHead = ({ previousRowWithOuterStates, ...props }) => ({
  ...props,
  previousRowWithOuterStates: tail(previousRowWithOuterStates),
});

const toNeighborhoods = until(
  ({ previousRowWithOuterStates }) => gt(
    3,
    length(previousRowWithOuterStates),
  ),
  pipe(
    appendNeighborhood,
    removePreviousRowHead,
  ),
);

const toRow = ({
  neighborhoods,
  neighborhoodsToRow,
  ...props
}) => ({
  ...props,
  row: neighborhoodsToRow(neighborhoods),
});

const row = pipe(
  toPreviousRow,
  toPreviousRowWithOuterStates,
  toNeighborhoods,
  toRow,
  prop('row'),
);

export default row;