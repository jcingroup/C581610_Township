import React = require('react');
import Moment = require('moment');
import { makeInputValue, clone, MntV} from '../ts-comm/comm-func';
import {config} from '../ts-comm/def-data';
import {ac_type_comm} from '../action_type';
import DatePicker = require('react-datepicker');
import "react-datepicker/dist/react-datepicker.css";

export class AStart extends React.Component<any, any>{

    constructor() {
        super();
        this.goService = this.goService.bind(this);
        this.callSubmit = this.callSubmit.bind(this);
        this.chgVal = this.chgVal.bind(this);
        this.chgDate = this.chgDate.bind(this);

        this.state = {};
    }
    chgVal(name: string, e: React.SyntheticEvent) {
        let value = makeInputValue(e);
        this.props.setInputValue(ac_type_comm.chg_fld_val, name, value);
    }
    chgTime(name: string, e: React.SyntheticEvent) {
        let value: string = makeInputValue(e);
        let sv = value.split(":");

        this.props.setInputValue(ac_type_comm.chg_fld_val, name, sv[0] + ":00");
    }
    chgDate(name: string, MM: moment.Moment) {

        if (MM != null) {
            console.log(MM.format());
            this.props.setInputValue(ac_type_comm.chg_fld_val, name, MM.format());
        } else {
            this.props.setInputValue(ac_type_comm.chg_fld_val, name, null);
        }
    }
    callSubmit(e: React.FormEvent) {
        e.preventDefault();
        let field: server.Reserve = this.props.field;
        if (field.person <= 0) {
            alert("使用人數不可少於1人!");
            return;
        }

        this.props.ajaxSubmit(field);
        return;
    }
    goService() {
        location.href = gb_approot + "Service";
    }
    render() {
        let out_html: JSX.Element = null;
        let pp = this.props;
        let field: server.Reserve = pp.field;
        let info: server.OrderInfo = pp.info;

        let mnt_day = MntV(field.day);
        out_html =
            (<div>
                <aside className="order-data card">
                    <h4 className="title-underline">您的預約資料</h4>
                    <p>
                        <label className="form-element-label text-primary font-lg">住戶 {info.no}</label>
                        <input type="text" className="input-underline font-lg" value={field.name} onChange={this.chgVal.bind(this, 'name') } />
                    </p>
                    <p>
                        <label className="form-element-label text-primary font-lg">聯絡電話</label>
                        <input type="tel" className="input-underline font-lg" value={field.tel}  onChange={this.chgVal.bind(this, 'tel') } />
                    </p>
                    <br />
                    <a href="#order-check" className="btn popup">確認預約</a> { }
                    <a href={ gb_approot + "Service"} className="btn bg-danger">取消預約</a>
                </aside>
                <section className="order-info">
                    <h4 className="text-primary">一、確認要預約的設施</h4>
                    <img src={info.item.img_src} alt={info.item.name + "照片"} className ="float-l margin-right" />
                    <div className="col-rest font-lg">
                        <i className="icon-check_box text-success font-xl"></i> {info.item.name}
                        <br />
                        <span dangerouslySetInnerHTML={{ __html: info.item.info.replace(/(\n)/g, '<br />') }}></span>
                    </div>
                </section>
                <section className="order-info">
                    <h4 className="text-primary float-l margin-right">二、選取使用人數</h4>
                    <input type="number" className="form-element input-size-md" value={field.person} onChange={this.chgVal.bind(this, 'person') } min={0} />
                    <span className="margin-left">人</span>
                </section>
                <section className="order-info">
                    <h4 className="text-primary">三、選取使用時間</h4>
                    <div className="col-4 col-first">
                        <DatePicker selected={mnt_day}
                            dateFormat={config.dateFT}
                            isClearable={true}
                            required={true}
                            locale="zh-TW"
                            showYearDropdown
                            minDate={Moment() }
                            onChange={this.chgDate.bind(this, 'day') }
                            className="form-element" />
                        <div>近二週內</div>
                    </div>
                    <div className="col-4">
                        <input type="time" className="form-element" placeholder="請輸入開始時間" value={field.s_time} onChange={this.chgTime.bind(this, 's_time') } />
                        開始 <small>(最小單位 1小時 ~3小時) </small>
                    </div>
                    <div className="col-4 col-last">
                        <input type="time" className="form-element" placeholder="請輸入結束時間" value={field.e_time} onChange={this.chgTime.bind(this, 'e_time') }  />
                        結束 <small>(最小單位 1小時 ~3小時) </small>
                    </div>
                </section>
                <div id="order-check" className="dialog zoom-anim-dialog mfp-hide">
                    <form onSubmit={this.callSubmit}>
                        <h3 className="text-primary text-center">您已預約【{info.item.name}】</h3>
                        <p>
                            <label className="form-element-label">使用人數：</label>
                            <input type="number" className="input-underline text-center" value={field.person} onChange={this.chgVal.bind(this, 'person') } min={0} required /> 人
                        </p>
                        <p>
                            <label className="form-element-label">使用日期：</label>
                            <DatePicker selected={mnt_day}
                                dateFormat={config.dateFT}
                                isClearable={true}
                                required={true}
                                locale="zh-TW"
                                showYearDropdown
                                minDate={Moment() }
                                onChange={this.chgDate.bind(this, 'day') }
                                className="input-underline" />

                            <input type="time" className="input-underline" value={field.s_time} onChange={this.chgTime.bind(this, 's_time') } required />
                            ~
                            <input type="time" className="input-underline" value={field.e_time} onChange={this.chgTime.bind(this, 'e_time') }  required/>
                        </p>
                        <p>
                            <label className="form-element-label">住戶 {info.no}：</label>
                            <input type="text" className="input-underline input-size-lg" value={field.name} onChange={this.chgVal.bind(this, 'name') } required />
                        </p>
                        <p>
                            <label className="form-element-label">聯絡電話：</label>
                            <input type="tel" className="input-underline input-size-lg" value={field.tel} onChange={this.chgVal.bind(this, 'tel') } required />
                        </p>
                        <br />

                        <div className="text-center">
                        <button className="btn" type="submit">送出預約單</button> { }
                        <button className="btn bg-danger" type="button" onClick={this.goService}>取消預約</button>
                        </div>
                    </form>
                </div>
            </div>
            );

        return out_html;
    }
}