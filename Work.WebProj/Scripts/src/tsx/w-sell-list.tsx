import React = require('react');
import ReactDOM = require('react-dom');
import CommMatter = require('comm-matter');

declare var community_id: number;
declare var info_type: string;
var dom = document.getElementById('content');
ReactDOM.render(<CommMatter.MatterList community_id={community_id} info_type={info_type} />, dom); 