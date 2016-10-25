import React, { PropTypes, Component } from 'react';
import { Editor, EditorState, CompositeDecorator } from 'draft-js';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { tableMetadataSelector } from '../../modules/tableMetadata/selector';
import _ from 'lodash';

const styles = {
  root: {
    fontFamily: '\'Helvetica\', sans-serif',
    padding: 20,
    width: 600,
    border: '1px solid #ddd',
  },
  editor: {
    border: '1px solid #ddd',
    cursor: 'text',
    fontSize: 16,
    minHeight: 40,
    padding: 10,
  },
  button: {
    marginTop: 10,
    textAlign: 'center',
  },
  column: {
    color: 'rgba(95, 184, 138, 1.0)',
  },
  invalidColumn: {
    color: 'rgba(255, 255, 255, 1.0)',
    background: 'rgba(184, 95, 97, 1.0)',
  },
  function: {
    color: 'rgba(184, 95, 97, 1.0)',
  },
};


function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr = regex.exec(text);
  let start;
  while (matchArr !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
    matchArr = regex.exec(text);
  }
}

function findColumns(regex, columns, contentBlock, callback, valid) {
  const text = contentBlock.getText();
  let matchArr = regex.exec(text);
  let start;
  while (matchArr !== null) {
    start = matchArr.index;
    const inColumns = _.some(columns, col => col === matchArr[1]);
    if (valid && inColumns) {
      callback(start, start + matchArr[0].length);
    }
    if (!valid && !inColumns) {
      callback(start, start + matchArr[0].length);
    }
    matchArr = regex.exec(text);
  }
}

const COLUMN_REGEX = /\[(.*?)\]/g;
const FUNCTION_REGEX = /ROW_MAX|ROW_MIN/ig;

function columnStrategyWrapper(tableMetadata, valid) {
  const columns = _.map(tableMetadata, 'name');
  return (contentBlock, callback) => {
    findColumns(COLUMN_REGEX, columns, contentBlock, callback, valid);
  };
}

function functionStrategy(contentBlock, callback) {
  findWithRegex(FUNCTION_REGEX, contentBlock, callback);
}

const ColumnSpan = (props) =>
  <span {...props} style={styles.column}>{props.children}</span>;

ColumnSpan.propTypes = {
  children: PropTypes.array,
};

const invalidColumnSpan = (props) =>
  <span {...props} style={styles.invalidColumn}>{props.children}</span>;

invalidColumnSpan.propTypes = {
  children: PropTypes.array,
};

const FunctionSpan = (props) =>
  <span {...props} style={styles.function}>{props.children}</span>;

FunctionSpan.propTypes = {
  children: PropTypes.array,
};

class MDFormulaEditor extends Component {
  constructor(props) {
    super(props);
    const compositeDecorator = new CompositeDecorator([
      {
        strategy: columnStrategyWrapper(this.props.tableMetadata, true),
        component: ColumnSpan,
      },
      {
        strategy: columnStrategyWrapper(this.props.tableMetadata, false),
        component: invalidColumnSpan,
      },
      {
        strategy: functionStrategy,
        component: FunctionSpan,
      },
    ]);

    this.state = {
      editorState: EditorState.createEmpty(compositeDecorator),
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = this.onChange.bind(this);
  }

  onChange(editorState) {
    this.setState({ editorState });
  }

  render() {
    return (
      <div style={styles.root} onClick={this.focus}>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          ref="editor"
          spellCheck={false}
        />
      </div>
    );
  }
}

MDFormulaEditor.propTypes = {
  tableMetadata: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  tableMetadata: tableMetadataSelector,
});

export default connect(mapStateToProps)(MDFormulaEditor);
