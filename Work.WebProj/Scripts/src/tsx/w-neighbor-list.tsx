import jQuery = require('jquery');
import Bootstrap = require('bootstrap');
[jQuery, Bootstrap];

import React = require('react');
import ReactDOM = require('react-dom');
import DT = require('dt');
import update = require('react-addons-update');
import ReactBootstrap = require('react-bootstrap');
import LazyLoad = require('react-lazyload');

//import { LazyLoad } from "./react-lazyload";
namespace WWW {

    interface WWWState {
        search?: {
            city: string
        },
        lists?: Array<server.Community>
    }

    export class SellList extends React.Component<any, WWWState>{

        constructor() {
            
            super();
            this.componentDidMount = this.componentDidMount.bind(this);
            this.componentDidUpdate = this.componentDidUpdate.bind(this);
            this.componentWillUnmount = this.componentWillUnmount.bind(this);
            this.setSearchEventValue = this.setSearchEventValue.bind(this);
            this.setSearchValue = this.setSearchValue.bind(this);
            this.submitSearch = this.submitSearch.bind(this);
            this.state = {
                search: {
                    city: null
                },
                lists: []
            };
        }

        static defaultProps: BaseDefine.GridFormPropsBase = {
        }
        componentDidMount() {

            var _this = this;

            $.get(gb_approot + 'api/GetAction/SearchCommunity', {})
                .done((data, textStatus, jqXHRdata) => {
                    _this.setState({ lists: data });
                    $("img.lazy").lazyload({ effect: "fadeIn" });
                });

            $('.dropdown-menu').click(function (e) {
                e.stopPropagation();
            });

            $('[name=city]').click(function (e) {
                _this.setSearchValue('city', e);
            })

            $('#price_low').change(function (e) {
                _this.setSearchValue('price_low', e);
            })



        }
        componentDidUpdate(prevProps, prevState) {

        }
        componentWillUnmount() {

        }

        setSearchEventValue(name: string, e: React.SyntheticEvent) {
            //console.log('Event');
            let input: HTMLInputElement = e.target as HTMLInputElement;
            let value;

            if (input.value == 'true') {
                value = true;
            } else if (input.value == 'false') {
                value = false;
            } else {
                value = input.value;
            }
            var objForUpdate = {
                search:
                {
                    [name]: { $set: value }
                }
            };
            var newState = update(this.state, objForUpdate);
            this.setState(newState);
        }
        setSearchValue(name, e) {
            var target = $(e.target);
            var value = target.val();

            var objForUpdate = {
                search:
                {
                    [name]: { $set: value }
                }
            };
            var newState = update(this.state, objForUpdate);
            this.setState(newState);
        }
        submitSearch(e) {
            e.preventDefault();
            $.get(gb_approot + 'api/GetAction/SearchCommunity', this.state.search)
                .done((data, textStatus, jqXHRdata) => {
                    this.setState({ lists: data });
                });
            return;
        }
        render() {
            var outHtml: JSX.Element = null;

            outHtml = (
                <div className="wrap">
                    <ol className="prolist row">
                        {
                            this.state.lists.map(function (item, i) {
                                return (
                                    <li className="pro style2">
                                        <article className="card">
                                            <a className="card-img-top" href={gb_approot + 'Neighbor/Content?id=' + item.community_id}>
                                                <img className="lazy" alt=""  data-original={item.list_src} />
                                            </a>
                                            <div className="card-block">
                                                <h4 className="card-title"><a href={gb_approot + 'Neighbor/Content?id=' + item.community_id}>{item.community_name}</a></h4>
                                                <section className="card-text">
                                                    {/*<h5 className="card-subtitle">{item.address}</h5>
                                                    <ul className="info list-inline">
                                                        <li><span className="text-muted">戶數</span> {item.holders}戶</li>
                                                        <li><span className="text-muted">管理方式</span> {item.manage}</li>
                                                        <li><span className="text-muted">屋齡</span> {item.age}年</li>
                                                    </ul>*/}
                                                </section>
                                                <a className="more btn btn-secondary btn-block" href={gb_approot + 'Neighbor/Content?id=' + item.community_id}>
                                                    看更多
                                                    <i className="ti-angle-right" />
                                                </a>
                                            </div>
                                        </article>
                                    </li>
                                );
                            })
                        }
                    </ol>
                </div>
            );

            return outHtml;
        }
    }
}

var dom = document.getElementById('content');
ReactDOM.render(<WWW.SellList  />, dom); 