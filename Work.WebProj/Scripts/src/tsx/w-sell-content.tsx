import jQuery = require('jquery');
import Bootstrap = require('bootstrap');
[jQuery, Bootstrap];

import React = require('react');
import ReactDOM = require('react-dom');
import DT = require('dt');
import update = require('react-addons-update');
import CommFunc = require('comm-func');
declare var id: number;


var langData = [];

langData['zh-TW'] = {
    code_typeOfHouse: {
        H: '住宅大樓',
        D: '公寓',
        T: '透天',
        F: '辦公大樓'
    },
    code_build_state: {
        I: '成屋',
        S: '預售屋'
    }
}

var langItem = langData['zh-TW'];

namespace WWW {

    interface WWWState {
        item?: server.Matter
    }

    export class SellContent extends React.Component<any, WWWState>{

        constructor() {

            super();
            this.componentDidMount = this.componentDidMount.bind(this);
            this.componentDidUpdate = this.componentDidUpdate.bind(this);
            this.componentWillUnmount = this.componentWillUnmount.bind(this);
            this.setSearchEventValue = this.setSearchEventValue.bind(this);
            this.setSearchValue = this.setSearchValue.bind(this);

            this.state = {
                item: { imgurl_MatterPhoto: [] }
            };
        }

        static defaultProps: BaseDefine.GridFormPropsBase = {
        }
        componentDidMount() {

            var _this = this;

            $.get(gb_approot + 'api/GetAction/GetMatter', { id: id })
                .done((data: IResultData<server.Matter>, textStatus, jqXHRdata) => {
                    if (data.result) {
                        _this.setState({ item: data.data });
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
                    } else {
                        alert(data.message);
                    }
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

            var is_elevator = item.is_elevator ? "有" : "無";

            var out_info_1 = null;
            var out_info_2 = null;
            var bread_link = null;

            //賣
            if (item.info_type == 'S') {

                let is_end = item.is_end ? "邊間" : "";
                let is_darkroom = item.is_darkroom ? "暗房" : "";

                bread_link = <a href={gb_approot + 'Sell/List'}>我要買房</a>;

                out_info_1 = <dl className="grid-pro row">
                    <dt className="thumb">
                        <i className="img-thumbnail">
                            <img className="lazy" alt="" data-original={item.imgurl_MatterPhoto_1} />
                        </i>
                        <a className="btn btn-secondary btn-sm scroll" href="#gallery">看更多實景照片</a>
                    </dt>
                    <dd className="profile">
                        <article>
                            <h3 className="h4">
                                <span className="label label-sell">售</span> { }
                                {item.city + item.country + item.address}
                                <small className="text-primary m-l-1">物件編號：{item.sn}</small>
                            </h3>
                            <ul className="detail list-unstyled">
                                <li><strong className="text-secondary">總價：</strong><strong className="price text-danger">{CommFunc.formatNumber(item.price / 10000) }</strong>萬</li>
                                <li><strong className="text-secondary">建物登記：</strong>{item.build_area} 坪</li>
                                <li><strong className="text-secondary">每坪單價：</strong>{item.unit_area_price } 萬</li>
                                <li><strong className="text-secondary">類型：</strong>{langItem.code_typeOfHouse[item.typeOfHouse]}</li>
                                <li><strong className="text-secondary">社區名稱：</strong><a href={gb_approot + 'Neighbor/Sell_list?community_id=' + item.community_id} target="_blank">{item.community_name}</a></li>
                                <li><strong className="text-secondary">格局：</strong>{item.bedrooms}房 / {item.livingrooms}廳 / {item.bathrooms}衛 / {item.rooms}室</li>
                                <li>
                                    <div className="row">
                                        <div className="grid">
                                            <strong className="text-secondary">主建物：</strong>{item.house_area} 坪
                                        </div>
                                        <div className="grid">
                                            <strong className="text-secondary">土地登記：</strong>{item.land_area} 坪
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div className="grid">
                                            <strong className="text-secondary">屋齡：</strong>{item.age}年
                                        </div>
                                        <div className="grid">
                                            <strong className="text-secondary">車位：</strong>{item.parking}
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div className="grid">
                                            <strong className="text-secondary">電梯：</strong>{is_elevator}
                                        </div>
                                        <div className="grid">
                                            <strong className="text-secondary">樓層/樓高：</strong>{item.site_floor} { } / { } {item.total_floor}樓
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <p>高樓景觀屋況佳、格局方正採光佳、市場學區交通便利、優質社區平面車位</p>
                                </li>
                            </ul>
                            <ul className="more-info list-unstyled clearfix">
                                <li className="tel">
                                    <h5 className="h5 m-b-0">來電預約賞屋</h5>
                                    <strong>03-318-0692</strong>
                                </li>
                                <li>
                                    <a className="btn btn-lg btn-secondary style2 scroll" href="#interior">格局圖</a>
                                </li>
                                <li>
                                    <a className="btn btn-lg btn-secondary style2 scroll" href="#location">地圖</a>
                                </li>
                                <li>
                                    <a className="btn btn-lg btn-secondary style2 scroll" href="#facility">生活機能</a>
                                </li>
                            </ul>
                        </article>
                    </dd>
                </dl>;

                out_info_2 = <section className="grid-info">
                    <h3 className="h3">基本資料</h3>
                    <table className="table table-striped">
                        <tbody><tr>
                            <th scope="row">地址</th>
                            <td colSpan={3}>{item.city + item.country + item.address}</td>
                        </tr>
                            <tr>
                                <th scope="row">總價</th>
                                <td colSpan={3}>{CommFunc.formatNumber(item.price / 10000) } 萬</td>
                            </tr>
                            <tr>
                                <th scope="row">格局</th>
                                <td colSpan={3}>{item.bedrooms}房/ {item.livingrooms}廳/ {item.bedrooms}衛/ {item.rooms}室</td>
                            </tr>
                            <tr>
                                <th scope="row">建物登記</th>
                                <td colSpan={3}>{item.build_area} 坪</td>
                            </tr>
                            <tr>
                                <th scope="row">土地登記</th>
                                <td colSpan={3}>
                                    {item.land_area} 坪<br />
                                    主建物 {item.house_area}坪　陽台 {item.balcony_area}坪　雨遮 {item.umbrella_aea}坪　公共設施 {item.public_area}坪
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">屋齡</th>
                                <td colSpan={3}>{item.age} 年</td>
                            </tr>
                            <tr>
                                <th scope="row">該層戶數</th>
                                <td style={{ width: '30%' }}>該層{item.buildhouses}戶；共用2部電梯</td>
                                <th scope="row" style={{ width: '15%' }}>出售樓層/總樓層</th>
                                <td>{item.site_floor}/{item.total_floor}樓</td>
                            </tr>
                            <tr>
                                <th scope="row">類型</th>
                                <td>{langItem.code_typeOfHouse[item.typeOfHouse]}</td>
                                <th scope="row">朝向</th>
                                <td>{ item.orientation }</td>
                            </tr>
                            <tr>
                                <th scope="row">月管理費</th>
                                <td>{item.managementFeeOfMonth} 元</td>
                                <th scope="row">警衛管理</th>
                                <td>{item.guard}</td>
                            </tr>
                            <tr>
                                <th scope="row">建物結構</th>
                                <td>{item.architecture}</td>
                                <th scope="row">特殊格局</th>
                                <td>{is_end}{is_darkroom}</td>
                            </tr>
                            <tr>
                                <th scope="row">車位</th>
                                <td>{item.parking}</td>
                                <th scope="row">外牆建材</th>
                                <td>{item.wall_materials}</td>
                            </tr>
                        </tbody></table>
                </section>;
            }

            //租
            if (item.info_type == 'R') {

                bread_link = <a href={gb_approot + 'Rent/List'}>我要租屋</a>;

                out_info_1 = <dl className="grid-pro row">
                    <dt className="thumb">
                        <i className="img-thumbnail">
                            <img className="lazy" alt="" data-original={item.imgurl_MatterPhoto_1} />
                        </i>
                        <a href="#gallery" className="btn btn-secondary btn-sm scroll">看更多實景照片</a>
                    </dt>
                    <dd className="profile">
                        <article>
                            <h3 className="h4">
                                <span className="label label-rent">租</span> { }
                                {item.city + item.country + item.address}
                                <small className="text-primary m-l-1">物件編號：{item.sn}</small>
                            </h3>
                            <ul className="detail list-unstyled">
                                <li><strong className="text-secondary">租金：</strong><strong className="price text-danger">{CommFunc.formatNumber(item.rentOfMonh) }</strong>元/月</li>
                                <li><strong className="text-secondary">押金：</strong>2 個月</li>
                                <li><strong className="text-secondary">坪數：</strong>{item.build_area} 坪</li>
                                <li><strong className="text-secondary">類型：</strong>{langItem.code_typeOfHouse[item.typeOfHouse]}</li>
                                <li><strong className="text-secondary">格局：</strong>{item.bedrooms}房 / {item.livingrooms}廳 / {item.bathrooms}衛 / {item.rooms}室</li>
                                <li><strong className="text-secondary">地址：</strong>{item.city + item.country + item.address}</li>
                                <li>
                                    <div className="row">
                                        <div className="grid">
                                            <strong className="text-secondary">屋齡：</strong>{item.age}年
                                        </div>
                                        <div className="grid">
                                            <strong className="text-secondary">車位：</strong>{item.parking}
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div className="grid">
                                            <strong className="text-secondary">電梯：</strong>{item.is_elevator}
                                        </div>
                                        <div className="grid">
                                            <strong className="text-secondary">樓層/樓高：</strong>{item.site_floor} { } / { } {item.total_floor}樓
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <p>高樓景觀屋況佳、格局方正採光佳、市場學區交通便利、優質社區平面車位</p>
                                </li>
                            </ul>
                            <ul className="more-info list-unstyled clearfix">
                                <li className="tel">
                                    <h5 className="h5 m-b-0">來電預約賞屋</h5>
                                    <strong>02-3501-6715</strong>
                                </li>
                                <li>
                                    <a href="#interior" className="btn btn-lg btn-secondary style2 scroll">格局圖</a>
                                </li>
                                <li>
                                    <a href="#location" className="btn btn-lg btn-secondary style2 scroll">地圖</a>
                                </li>
                                <li>
                                    <a href="#facility" className="btn btn-lg btn-secondary style2 scroll">生活機能</a>
                                </li>
                            </ul>
                        </article>
                    </dd>
                </dl>;

                out_info_2 = <section className="grid-info">
                    <h3 className="h3">基本資料</h3>
                    <table className="table table-striped">
                        <tr>
                            <th scope="row">管理費</th>
                            <td style={{ width: '30%' }}>{item.rent_management}</td>
                            <th style={{ width: '15%' }} scope="row">最短租期</th>
                            <td>{item.rent_short_date}</td>
                        </tr>
                        <tr>
                            <th scope="row">開伙</th>
                            <td>{item.rent_cook}</td>
                            <th scope="row">寵物</th>
                            <td>{item.rent_pet}</td>
                        </tr>
                        <tr>
                            <th scope="row">身分要求</th>
                            <td>{item.rent_identity}</td>
                            <th scope="row">性別要求</th>
                            <td>{item.rent_sex}</td>
                        </tr>
                        <tr>
                            <th scope="row">可遷入日</th>
                            <td colSpan={3}>{item.rent_start_date}</td>
                        </tr>
                        <tr>
                            <th scope="row">家具提供</th>
                            <td colSpan={3}>{item.rent_furniture}</td>
                        </tr>
                        <tr>
                            <th scope="row">設備提供</th>
                            <td colSpan={3}>{item.rent_equip}</td>
                        </tr>
                    </table>
                </section>;
            }

            outHtml = (
                <div className="wrap">
                    <h2 className="h2 title">{item.matter_name}</h2>
                    <ol className="breadcrumb">
                        <li><a href={gb_approot}>HOME</a></li>
                        <li>{bread_link}</li>
                    </ol>
                    {out_info_1}
                    {out_info_2}
                    <section className="grid-info" id="gallery">
                        <h3 className="h3">物件實景照片</h3>
                        <ol className="gallery row">
                            {
                                this.state.item.imgurl_MatterPhoto.map(function (sub_item, i) {
                                    return (
                                        <li key={i}><a className="img-thumbnail" href={sub_item}><img className="lazy" alt="" data-original={sub_item} /></a></li>
                                    );
                                })
                            }
                        </ol>
                    </section>
                    <section className="grid-info" id="interior">
                        <h3 className="h3">格局圖</h3>
                        <p className="text-xs-center">
                            <img className="img-thumbnail lazy" alt="" data-original={item.imgurl_MatterStyle} />
                        </p>
                    </section>
                    <section className="grid-info" id="facility">
                        <h3 className="h3">生活機能</h3>
                        <span dangerouslySetInnerHTML={{ __html: item.context_life }}></span>
                    </section>
                    <section className="grid-info" id="location">
                        <h3 className="h3">地圖</h3>
                        <div id="map" dangerouslySetInnerHTML={{ __html: item.map_iframe }}></div>
                    </section>
                </div>

            );

            return outHtml;
        }
    }
}

var dom = document.getElementById('content');
ReactDOM.render(<WWW.SellContent  />, dom); 