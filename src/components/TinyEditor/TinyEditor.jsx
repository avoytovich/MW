import React from 'react';
import PropTypes from 'prop-types';

import { Editor } from '@tinymce/tinymce-react';

import contentCss from 'tinymce/skins/content/default/content.min.css';
import contentUiCss from 'tinymce/skins/ui/oxide/content.min.css';

import './tinyEditor.scss';

const tinyApiKey = 'se7x7gpvgb27p864drb8azmziv0pjikrjogirc7hqcsd5fng';

const TinyEditor = ({
  placeholder,
  initialValue,
  onChange,
}) => (
  <>
    <Editor
      apiKey={tinyApiKey}
      init={{
        placeholder,
        toolbar_mode: 'floating',
        inline: true,
        menubar: false,
        statusbar: false,
        plugins: 'lists code image',
        toolbar: 'undo redo | formatselect | bold italic | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent | removeformat | code | image',
        content_style: [contentCss, contentUiCss].join('\n'),
      }}
      initialValue={initialValue}
      onBlur={onChange}
    />
  </>
);

TinyEditor.propTypes = {
  placeholder: PropTypes.string,
  initialValue: PropTypes.string,
  onChange: PropTypes.func,
};

export default TinyEditor;
