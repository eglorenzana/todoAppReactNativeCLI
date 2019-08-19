import PropTypes from 'prop-types';

const TodoShape = PropTypes.shape({
  title: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date),
  description: PropTypes.string,
  completed: PropTypes.bool,
});


export default TodoShape;
