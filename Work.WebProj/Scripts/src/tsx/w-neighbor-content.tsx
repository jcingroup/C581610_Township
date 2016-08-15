import jQuery = require('jquery');
import Bootstrap = require('bootstrap');
[jQuery, Bootstrap];

import React = require('react');
import ReactDOM = require('react-dom');
import DT = require('dt');
import update = require('react-addons-update');
import CommFunc = require('comm-func');
import Moment = require('moment');

declare var id: number;
declare var json_data: server.Community;

namespace WWW {

    interface WWWState {
        item?: server.Community
        news?: Array<server.Community_News>
        banner?: Array<server.Community_Banner>
    }

    export class CommunityContent extends React.Component<any, WWWState>{

        constructor() {

            super();
            this.componentDidMount = this.componentDidMount.bind(this);
            this.componentDidUpdate = this.componentDidUpdate.bind(this);
            this.componentWillUnmount = this.componentWillUnmount.bind(this);
            this.setSearchEventValue = this.setSearchEventValue.bind(this);
            this.setSearchValue = this.setSearchValue.bind(this);

            this.state = {
                item: json_data,
                news: [],
                banner: []
            };
        }

        static defaultProps: BaseDefine.GridFormPropsBase = {
        }
        componentDidMount() {

            var _this = this;

            if (window.location.hash) {
                $('html, body').animate({ scrollTop: 0 }, 0);
                var hash = window.location.hash;
                $('html, body').animate({
                    scrollTop: $(hash).offset().top - 250
                }, 2000);
            }

            $.get(gb_approot + 'api/GetAction/GetNewsList', { id: id })
                .done((data: Array<server.Community_News>, textStatus, jqXHRdata) => {
                    _this.setState({ news: data });


                    $.get(gb_approot + 'api/GetAction/GetCommunityBannerList', { id: id })
                        .done((data: Array<server.Community_Banner>, textStatus, jqXHRdata) => {
                            _this.setState({ banner: data });

                            $("img.lazy").lazyload({ effect: "fadeIn" });

                            $(document).ready(function () {

                                $('.gallery').each(function () { // the containers for all your galleries
                                    $(this).magnificPopup({
                                        delegate: 'a', // the selector for gallery item
                                        type: 'image',
                                        mainClass: 'mfp-with-fade',
                                        gallery: {
                                            enabled: true
                                        }
                                    });
                                });
                                $('.pop').magnificPopup({
                                    type: 'iframe',
                                    mainClass: 'mfp-with-fade'
                                });

                                var swiper = new Swiper('.bulletin', {
                                    nextButton: '.swiper-button-next',
                                    prevButton: '.swiper-button-prev',
                                    speed: 1000,
                                    spaceBetween: 15
                                });

                                var marquee = new Swiper('#marquee', {
                                    nextButton: '.swiper-button-next',
                                    prevButton: '.swiper-button-prev',
                                    autoplay: 2500,
                                    speed: 2000,
                                    slidesPerView: 'auto',
                                });

                            });

                        });

                });



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

        render() {

            var outHtml: JSX.Element = null;
            var item = this.state.item;
            var outBanner = null;
            var info_content_html: JSX.Element[] = [];
            if (item.info_content != null) {
                info_content_html = item.info_content.split('\n').map((tmp, i) => { return (<p>{tmp}</p>); });
            }

            //如果有廣告
            if (this.state.banner.length > 0) {
                outBanner =
                    <section className="grid-info">
                        <div id="marquee" className="swiper-container">
                            <ul className="swiper-wrapper list-unstyled">
                                {
                                    this.state.banner.map(function (item, i) {
                                        return (<li className="swiper-slide" key={item.community_banner_id}>
                                            <a className="pop" href={gb_approot + 'Neighbor/Notice?id=' + item.community_banner_id}>
                                                <img src={item.imgurl_CommunityBannerPhoto_1} />
                                                <span className="title">{item.title}</span>
                                            </a>
                                        </li>);
                                    })
                                }
                            </ul>
                            <a className="swiper-button-prev" href="#"></a>
                            <a className="swiper-button-next" href="#"></a>
                        </div>
                    </section>
            }
            let group_buying_url = item.group_buying_url != null ? item.group_buying_url : " http://www.jojogo168.com/42700981_001";

            outHtml = (
                <div className="wrap">
                    <div id="intro">
                        <h2 className="h2 title">{item.community_name}</h2>
                        <dl className="grid-pro row m-b-3">
                            <dt className="thumb">
                                <i className="img-thumbnail">
                                    <img className="lazy" data-original={item.imgurl_CommunityList} />
                                </i>
                                <a className="btn btn-secondary btn-sm scroll" href="#gallery">看更多實景照片</a>
                            </dt>
                            <dd className="profile">
                                {/*<ul className="detail list-unstyled">
                                    <li><strong className="text-secondary">完工日期：</strong>{item.finish}</li>
                                    <li><strong className="text-secondary">建物地址：</strong>{item.address}</li>
                                    <li><strong className="text-secondary">建物型態：</strong>{item.typeOfBuild}</li>
                                    <li><strong className="text-secondary">建物樓層：</strong>地上 {item.over_floor} 層 / 地下 {item.under_floor} 層</li>
                                    <li><strong className="text-secondary">總戶數：</strong>{item.holders}戶</li>
                                    <li><strong className="text-secondary">同層戶數：</strong>{item.perOfHolder}戶</li>
                                    <li><strong className="text-secondary">管理方式：</strong>{item.manage}</li>
                                    <li><strong className="text-secondary">建設公司：</strong>{item.company}</li>
                                    <li><strong className="text-secondary">營造公司：</strong>{item.build}</li>
                                </ul>*/}
                                <div className="detail-text">
                                    {info_content_html}
                                </div>
                                <ul className="more-info list-unstyled clearfix">
                                    <li>
                                        <a className="btn btn-lg btn-secondary style2" href={gb_approot + 'Neighbor/Sell_list?community_id=' + item.community_id}>我要買房</a>
                                    </li>
                                    <li>
                                        <a className="btn btn-lg btn-secondary style2" href={gb_approot + 'Neighbor/Rent_list?community_id=' + item.community_id}>我要租屋</a>
                                    </li>
                                    <li>
                                        <a className="btn btn-lg btn-secondary style2" target="new" href={group_buying_url}>好康團購</a>
                                    </li>
                                </ul>
                            </dd>
                        </dl>
                    </div>
                    {outBanner}
                    <section className="grid-info" id="feature">
                        <h3 className="h3">商家特色</h3>
                        <p dangerouslySetInnerHTML={ { __html: item.txt_spot } }></p>
                    </section>
                    <section className="grid-info" id="gallery">
                        <h3 className="h3">商家實景</h3>
                        <p dangerouslySetInnerHTML={ { __html: item.txt_public } }></p>
                        <article className="article">
                            {/*<h4 className="h4">迎賓大門</h4>*/}
                            <ol className="gallery row">
                                {
                                    item.imgurl_CommunityDoor.map(function (item, i) {
                                        return (<li>
                                            <a className="img-thumbnail" href={item} key={i}>
                                                <img className="lazy" data-original={item} />
                                            </a>
                                        </li>);
                                    })
                                }
                            </ol>
                        </article>
                        {/*<article className="article">
                            <h4 className="h4">社區公設</h4>
                            <ol className="gallery row">
                                {
                                    item.imgurl_CommunityPublic.map(function (item, i) {
                                        return (
                                            <li key={i}><a href={item} className="img-thumbnail"><img data-original={item} alt="" className="lazy" /></a></li>);
                                    })
                                }
                            </ol>
                        </article>*/}
                    </section>
                    <section className="grid-info" id="diary">
                        <div className="clearfix">
                            <ul className="pull-xs-right list-inline m-b-0">
                                <li className="swiper-button-prev" />
                                <li className="swiper-button-next" />
                            </ul>
                            <h3 className="h3">商家日誌</h3>
                        </div>
                        <div className="row">
                            <div className="col-xs-5">
                                <img className="img-thumbnail w-full" src={gb_approot + 'Content/images/Neighbor/pic.jpg'} />
                            </div>
                            <div className="bulletin col-xs-7 swiper-container">
                                <div className="swiper-wrapper">
                                    <ul className="swiper-slide list-unstyled">
                                        {
                                            this.state.news.map(function (item, i) {
                                                return (
                                                    <li key={item.community_news_id}>
                                                        <small className="date">{ Moment(item.start_date).format(DT.dateFT) }</small>
                                                        <a className="pop" href={gb_approot + 'Neighbor/News?id=' + item.community_news_id}>{item.title}</a>
                                                    </li>);

                                            })
                                        }
                                    </ul>

                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="grid-info" id="contact">
                        <h3 className="h3">聯絡方式</h3>
                        <div className="row">
                            <div className="col-xs-5">
                                <ul className="contact-list list-unstyled">
                                    <li><strong className="text-secondary">地址：</strong>{item.address}</li>
                                    <li><strong className="text-secondary">電話：</strong>{item.tel}</li>
                                    <li><strong className="text-secondary">E-mail：</strong>{item.email}</li>
                                    <li><strong className="text-secondary">聯絡人：</strong>{item.contact}</li>
                                </ul>
                            </div>
                            <div className="col-xs-7">
                                <div id="map" dangerouslySetInnerHTML={ { __html: item.map_iframe }}></div>
                            </div>
                        </div>
                    </section>
                </div>
            );

            return outHtml;
        }
    }
}

var dom = document.getElementById('content');
ReactDOM.render(<WWW.CommunityContent  />, dom); 