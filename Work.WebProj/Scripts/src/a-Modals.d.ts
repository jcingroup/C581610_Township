declare module server {
    interface BaseEntityTable {
        edit_type?: number;
        check_del?: boolean;
        expland_sub?: boolean;
    }
    interface i_Code {
        code: string;
        langCode: string;
        value: string;
    }
    interface CUYUnit {
        sign: string;
        code: string;
    }
    interface i_Lang extends BaseEntityTable {
        lang: string;
        area: string;
        memo: string;
        isuse: boolean;
        sort: any;
    }
    interface SelectFormat {
        id: any;
        label: string;
    }
    interface StateTemplate extends SelectFormat {
        className?: string;
        classNameforG?: string;
    }
    interface loginField {
        lang: string;
        account: string;
        password: string;
        img_vildate: string;
        rememberme: boolean;

    }
    interface AspNetRoles extends BaseEntityTable {
        Id?: string;
        Name?: string;
        aspNetUsers?: any[];
    }
    interface UserRoleInfo {
        role_id: string;
        role_use: boolean;
        role_name: string;
    }
    interface AspNetUsers extends BaseEntityTable {
        Id?: string;
        email?: string;
        emailConfirmed?: boolean;
        passwordHash?: string;
        securityStamp?: string;
        phoneNumber?: string;
        phoneNumberConfirmed?: boolean;
        twoFactorEnabled?: boolean;
        lockoutEndDateUtc?: Date;
        lockoutEnabled?: boolean;
        accessFailedCount?: number;
        UserName?: string;
        user_name_c?: string;
        department_id?: number;
        aspNetRoles?: server.AspNetRoles[];
        role_array?: Array<UserRoleInfo>;
    }
    interface Menu extends BaseEntityTable {
        menu_id?: number;
        parent_menu_id?: number;
        menu_name?: string;
        description?: string;
        area?: string;
        controller?: string;
        action?: string;
        icon_class?: string;
        sort?: number;
        is_folder?: boolean;
        is_use?: boolean;
        is_on_tablet?: boolean;
        is_only_tablet?: boolean;
        aspNetRoles?: server.AspNetRoles[];
        role_array?: Array<UserRoleInfo>;
    }
    interface Option {//分類管理選單用
        val?: number;
        Lname?: string;
    }
    interface PageInfo {
        total: number;
        page: number;
        records: number;
        startcount: number;
        endcount: number;
    }

    interface Resident extends BaseEntityTable {
        resident_id?: number;
        resident_name?: string;
        resident_no?: string;
        account?: string;
        passwd?: string;
        email?: string;
    }

    interface News extends BaseEntityTable {
        news_id?: number;
        news_title?: string;
        day?: string;
        news_type?: number;
        news_content?: string;
        i_Hide?: boolean;
        i_InsertUserID?: string;
        i_InsertDeptID?: number;
        i_InsertDateTime?: Date;
        i_UpdateUserID?: string;
        i_UpdateDeptID?: number;
        i_UpdateDateTime?: Date;
        i_Lang?: string;
    }
    interface Editor extends BaseEntityTable {
        editor_id?: number;
        body_class?: string;
        url?: string;
        img_url?: string;
        name?: string;
        sort?: number;
        i_Hide?: boolean;
        EditorDetail?: server.EditorDetail[];
    }
    interface EditorDetail extends BaseEntityTable {
        editor_detail_id?: number;
        editor_id?: number;
        detail_name?: string;
        detail_content?: string;
        sort?: number;
        i_Hide?: boolean;
        edit_state?: IEditType;
        Editor?: server.Editor;
    }

    interface Editor_L1 extends BaseEntityTable {
        editor_l1_id?: number;
        body_class?: string;
        url?: string;
        img_url?: string;
        name?: string;
        sort?: number;
        i_Hide?: boolean;
        i_InsertUserID?: string;
        i_InsertDeptID?: number;
        i_InsertDateTime?: Date;
        i_UpdateUserID?: string;
        i_UpdateDeptID?: number;
        i_UpdateDateTime?: Date;
        i_Lang?: string;
        Editor_L2?: server.Editor_L2[];
        Editor_L3?: server.Editor_L3[];
    }
    interface Editor_L2 extends BaseEntityTable {
        editor_l2_id?: number;
        editor_l1_id?: number;
        l2_name?: string;
        l2_content?: string;
        sort?: number;
        i_Hide?: boolean;
        i_InsertUserID?: string;
        i_InsertDeptID?: number;
        i_InsertDateTime?: Date;
        i_UpdateUserID?: string;
        i_UpdateDeptID?: number;
        i_UpdateDateTime?: Date;
        i_Lang?: string;
        Editor_L1?: server.Editor_L1;
        Editor_L3?: server.Editor_L3[];
        edit_state?: IEditType;
    }
    interface Editor_L3 extends BaseEntityTable{
        editor_l3_id?: number;
        editor_l2_id?: number;
        editor_l1_id?: number;
        l3_name?: string;
        l3_content?: string;
        sort?: number;
        i_Hide?: boolean;
        i_InsertUserID?: string;
        i_InsertDeptID?: number;
        i_InsertDateTime?: Date;
        i_UpdateUserID?: string;
        i_UpdateDeptID?: number;
        i_UpdateDateTime?: Date;
        i_Lang?: string;
        Editor_L1?: server.Editor_L1;
        Editor_L2?: server.Editor_L2;
        edit_state?: IEditType;
    }
} 