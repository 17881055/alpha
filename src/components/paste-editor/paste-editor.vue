<template>
  <div class="paste-editor-wrapper">
    <textarea ref="codemirror"
              class="textarea-el"></textarea>
  </div>
</template>
<script>
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import { forEach } from '@/libs/tools';
import createPlaceholder from './plugins/placeholder';
export default {
  name: 'PasteEditor',
  props: {
    value: String,
    pasteData: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '从网页或其他应用软件复制，粘贴到这里。'
    }
  },
  data() {
    return {
      pasteDataArr: [],
      rowArrLength: 0,
      editor: null
    };
  },
  watch: {
    pasteData(val) {
      if (val === '') {
        this.editor.setValue('');
      }
    }
  },
  computed: {
    rowNum() {
      return this.pasteDataArr.length;
    },
    colNum() {
      return this.pasteDataArr[0] ? this.pasteDataArr[0].length : 0;
    }
  },
  methods: {
    handleKeyup(e) {
      // this.handleAreaData();
    },
    setValue(str) {
      this.editor.setValue(str);
    },
    getValue() {
      return this.editor.getValue();
    },
    /**
     * @description 处理粘贴操作
     */
    handleContentChanged(content) {
      /*  let pasteData = content.trim();
      this.$emit('on-content-change', pasteData);
      let rows = pasteData.split(/[\n\u0085\u2028\u2029]|\r\n?/g).map(row => {
        return row.split('\t');
      });
      if (content === '') rows = [];
      this.pasteDataArr = rows; */
      // this.clearLineClass();
      // this.checkColNumInEveryRow();
      this.$emit('input', content);
    },
    /**
     * @description 检查除第一行的每一行列数是否与第一行相同
     */
    checkColNumInEveryRow() {
      let i = 0;
      const len = this.rowNum;
      if (len === 0) return;
      while (++i < len) {
        let item = this.pasteDataArr[i];
        if (
          item.length !== this.colNum &&
          (!(i === len - 1 && item.length === 1 && item[0] === '') ||
            i !== len - 1)
        ) {
          this.markIncorrectRow(i);
          this.$emit('on-error', i);
          return false;
        }
      }
      this.$emit('on-success', this.pasteDataArr);
      return true;
    },
    /**
     * @description 标记不符合格式的一行
     */
    markIncorrectRow(index) {
      // this.editor.addLineClass(index, 'text', 'incorrect-row');
    },
    /**
     * @description 标记不符合格式的一行
     */
    clearLineClass() {
      /*  forEach(this.pasteDataArr, (item, index) => {
        this.editor.removeLineClass(index, 'text', 'incorrect-row');
      }); */
    }
  },
  mounted() {
    createPlaceholder(CodeMirror);
    this.editor = CodeMirror.fromTextArea(this.$refs.codemirror, {
      indentUnit: 1, // 缩进单位为4
      mode: 'htmlmixed', // 'text/html', // HMTL混合模式
      lineNumbers: true,
      tabSize: 1,
      lineWrapping: true,
      styleActiveLine: true,
      theme: '3024-day' // 编辑器主题
    });
    this.editor.on('change', editor => {
      this.handleContentChanged(editor.getValue());
    });
    // this.editor.addLineClass(0, 'text', 'first-row');
  }
};
</script>
<style lang="less">
@import './paste-editor.less';

.cm-s-3024-day.CodeMirror {
  background: #f7f7f7;
  color: #3a3432;
}
.cm-s-3024-day div.CodeMirror-selected {
  background: #d6d5d4;
}

.cm-s-3024-day .CodeMirror-line::selection,
.cm-s-3024-day .CodeMirror-line > span::selection,
.cm-s-3024-day .CodeMirror-line > span > span::selection {
  background: #d6d5d4;
}
.cm-s-3024-day .CodeMirror-line::-moz-selection,
.cm-s-3024-day .CodeMirror-line > span::-moz-selection,
.cm-s-3024-day .CodeMirror-line > span > span::selection {
  background: #d9d9d9;
}

.cm-s-3024-day .CodeMirror-gutters {
  background: #f7f7f7;
  border-right: 0px;
}
.cm-s-3024-day .CodeMirror-guttermarker {
  color: #db2d20;
}
.cm-s-3024-day .CodeMirror-guttermarker-subtle {
  color: #807d7c;
}
.cm-s-3024-day .CodeMirror-linenumber {
  color: #807d7c;
}

.cm-s-3024-day .CodeMirror-cursor {
  border-left: 1px solid #5c5855;
}

.cm-s-3024-day span.cm-comment {
  color: #cdab53;
}
.cm-s-3024-day span.cm-atom {
  color: #a16a94;
}
.cm-s-3024-day span.cm-number {
  color: #a16a94;
}

.cm-s-3024-day span.cm-property,
.cm-s-3024-day span.cm-attribute {
  color: #01a252;
}
.cm-s-3024-day span.cm-keyword {
  color: #db2d20;
}
.cm-s-3024-day span.cm-string {
  color: #fded02;
}

.cm-s-3024-day span.cm-variable {
  color: #01a252;
}
.cm-s-3024-day span.cm-variable-2 {
  color: #01a0e4;
}
.cm-s-3024-day span.cm-def {
  color: #e8bbd0;
}
.cm-s-3024-day span.cm-bracket {
  color: #3a3432;
}
.cm-s-3024-day span.cm-tag {
  color: #db2d20;
}
.cm-s-3024-day span.cm-link {
  color: #a16a94;
}
.cm-s-3024-day span.cm-error {
  background: #db2d20;
  color: #5c5855;
}

.cm-s-3024-day .CodeMirror-activeline-background {
  background: #e8f2ff;
}
.cm-s-3024-day .CodeMirror-matchingbracket {
  text-decoration: underline;
  color: #a16a94 !important;
}
</style>
