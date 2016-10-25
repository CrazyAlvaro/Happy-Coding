/* Replace with your SQL commands */
create table if not exists winston_logs (
  id serial primary key,
  ts timestamp default current_timestamp,
  level varchar(10) not null,
  message varchar(1024) not null,
  meta json
);

-- we put all ETL resulted tables in schema "用友"
create schema if not exists "用友";

-- 用友导出的5个Table
-- 这里table的名字和用友前端导出来的excel名字统一，里面的column名字也是统一的。方便校对。

-- 辅料对照表
create table if not exists "用友"."存货价格视图" (
   "id" bigint not null primary key,
   "存货大类" varchar(128),
   "存货编码" varchar(128), -- 用友里存在空
   "存货名称" varchar(128),
   "批发价" numeric,
   "调价日期" date
);

create index if not exists "存货价格视图_idx" on "用友"."存货价格视图" ("存货编码");

-- 贴牌对照表 客户价格列表
create table if not exists "用友"."客户价格视图" (
   "id" bigint not null primary key,
   "客户编码" varchar(128),
   "客户名称" varchar(128),
   "存货编码" varchar(128),
   "存货名称" varchar(128),
   "存货大类" varchar(128),
   "批发价" numeric, -- 服务费单价
   "商品单价" numeric,
   "调价日期" date
);

create index if not exists "客户价格视图_idx" on "用友"."客户价格视图" ("客户编码", "存货编码");

-- 客户档案
create table if not exists "用友"."客户档案" (
  "客户编码" varchar(128) not null primary key, -- H / FG1304
  "客户名称" varchar(128)-- I / 张家港市嘉美印刷包装有限公司
);

create index if not exists "客户档案_idx" on "用友"."客户档案" ("客户编码");

-- 凭证：用友收付款序时
create table if not exists "用友"."凭证" (
  "id" bigint not null primary key,
  "凭证日期" date,
  "客户编码" varchar(128),
  "摘要" varchar(128),
  "类别" bigint,
  "单号" varchar(128),
  "借方金额" numeric,
  "贷方金额" numeric,
  "对方科目" varchar(128),
  "凭证类型" varchar(128),
  "创建时间" timestamp
);

create index if not exists "凭证_日期_idx" on "用友"."凭证" ("凭证日期");
create index if not exists "凭证_客户编码_idx" on "用友"."凭证" ("客户编码");

-- 其实这个表不是用友的，但这个逻辑还是在用友里算稍微好一些
-- 拆分
create table if not exists "用友"."收付款序时" (
  "id" bigint not null primary key,
  "单号" varchar(128),
  "日期" date,
  "客户编码" varchar(128),
  "服务费" numeric,
  "辅料费" numeric,
  "服务费开票金额" numeric,
  "辅料费开票金额" numeric,
  "摘要" varchar(128),
  "对方科目" varchar(128),
  "凭证类型" varchar(128),
  "创建时间" timestamp
);

create index if not exists "收付款序时_客户编码_idx" on "用友"."收付款序时" ("客户编码");

create table if not exists "用友"."收付款序时-上年" (
  "id" serial not null primary key,
  "凭证类型" varchar(128),
  "客户编码" varchar(128),
  "摘要" varchar(128),
  "上年服务费余额" numeric,
  "上年辅料费余额" numeric,
  "上年快递费余额" numeric,
  "本年快递费" numeric,
  "产品" varchar(128),
  "现金/冲抵" varchar(128)
);

-- 销售序时
create table if not exists "用友"."发货单列表表头" (
   "表头id" bigint,
   "发货日期" date,
   "发货单号" varchar(128),
   "客户编码" varchar(128),
   "客户名称" varchar(128),
   "表头订单号" varchar(128),
   "创建时间" timestamp,
   "修改时间" timestamp,
   "销售类型编码" varchar(128),
   "销售类型名称" varchar(128)
);

create index if not exists "发货单列表表头_idx" on "用友"."发货单列表表头" ("表头id");

create table if not exists "用友"."发货单列表表体" (
  "表头id" bigint,
  "id" bigint,
  "存货编码" varchar(128),
  "对应贴牌" varchar(128),
  "存货名称" varchar(128),
  "数量" integer,
  "含税单价" numeric,
  "含税合计" numeric,
  "销售部门" varchar(128),
  "大类" varchar(128),
  "仓库" varchar(128),
  "季节" varchar(128),
  "年份" varchar(128),
  "累计开票数量" integer,
  "累计开票金额" numeric,
  "发票日期" date,
  "发票号码" varchar(128)
);

create index if not exists "发货单列表表体_idx" on "用友"."发货单列表表体" ("存货编码");
create index if not exists "发货单列表表体_idx2" on "用友"."发货单列表表体" ("表头id");

create or replace view "用友"."发货单列表" as
  select
    head."表头id",
    head."发货日期",
    head."销售类型编码",
    head."发货单号",
    head."客户编码",
    head."客户名称",
    head."表头订单号",
    head."创建时间",
    head."修改时间",
    body."id",
    body."存货编码",
    body."对应贴牌",
    body."存货名称",
    body."数量",
    body."含税单价",
    body."含税合计",
    body."销售部门",
    body."大类",
    body."仓库",
    body."季节",
    body."年份",
    body."累计开票数量",
    body."累计开票金额",
    body."发票日期",
    body."发票号码"
  from "用友"."发货单列表表头" as head
    join "用友"."发货单列表表体" as body on head."表头id" = body."表头id";

-- 我们自己keep的table
create table if not exists "客户-存货-产品" (
  "id" serial not null primary key,
  "客户编码" varchar(128) not null,
  "存货编码" varchar(128) not null,
  "产品" varchar(128) not null,
  unique("客户编码", "存货编码")
);

create table if not exists "产品-部门" (
  "id" serial not null primary key,
  "产品" varchar(128) not null,
  "项目" varchar(128),
  "事业部群" varchar(128)
);

create table if not exists "销售序时-手工" (
  "id" bigint not null primary key,
  "备注" varchar(128),
  "发票日期" date,
  "发票号码" varchar(128),
  "产品-手工" varchar(128),
  "修改人员" varchar(40),
  "修改时间" timestamp not null default current_timestamp
);

create table if not exists "收付款序时-手工" (
  "id" bigint not null primary key,
  "产品" varchar(128) not null,
  "服务费发票号码" varchar(128),
  "辅料费发票号码" varchar(128),
  "修改人员" varchar(40),
  "修改时间" timestamp not null default current_timestamp
);

/*
产品对照表

这个和原表有一些不一样：

一是有了一个新的部门列，我们把每个单品对应的部门都放这里。
二是有了一个调价日期，之后的正式价格，该是离日期最近的价格。

*/

create or replace view "贴牌对照表" as
select
  priceList."客户编码" as "编码",
  priceList."客户名称" as "客户名称",
  priceList."存货编码" as "存货编码",
  priceList."存货名称" as "商品名称",
  priceList."存货大类" as "商品大类（产品）",
  priceList."批发价" as "服务费单价",
  priceList."商品单价" as "商品单价",
  priceList."调价日期" as "调价日期",
  departmentList."产品" as "产品",  -- editable
  priceList."id"
from "用友"."客户价格视图" as priceList
left join "客户-存货-产品" as departmentList
  on priceList."存货编码" = departmentList."存货编码"
  and priceList."客户编码" = departmentList."客户编码";

-- update 产品 in 贴牌对照表 => 客户-存货-产品
create or replace function tiepai_update_row() returns trigger as
$$
begin
    insert into "客户-存货-产品" ("客户编码", "存货编码", "产品")
      values(new."编码", new."存货编码", new."产品")
    on conflict("客户编码", "存货编码") do update set "产品" = new."产品";
    return new;
end;
$$ language plpgsql;

drop trigger if exists update_tiepai on "贴牌对照表";
create trigger update_tiepai
  instead of update on "贴牌对照表"
  for each row
    execute procedure tiepai_update_row();

-- 目录-辅料对照表
-- 同上
create or replace view "辅料对照表" as
select
  priceList."存货编码" as "辅料编码",
  priceList."存货名称" as "名称",
  priceList."存货大类" as "类别",
  priceList."批发价" as "销售价",
  priceList."调价日期" as "调价日期",
  priceList."id" as "id"
from "用友"."存货价格视图" as priceList;

--销售序时

-- 把我们数据库的table转成大Excel里面的名字和顺序
create or replace view "销售序时-用友数据" as
select
  sales."id" as "id",
  sales."发货日期" as "发货日期", -- A
  sales."销售类型编码" as "销售类型编码", -- 这个是后来他们要求加上的，只筛选01的，但是可能以后有别的
  sales."发货单号" as "发货单号", -- B
  sales."客户编码" as "客户编码", -- C
  sales."客户名称" as "客户名称", -- D
  sales."存货编码" as "存货编码", -- E
  sales."对应贴牌" as "对应贴牌", -- F
  sales."存货名称" as "商品名称", -- G
  sales."数量" as "数量", -- H
  sales."含税单价" as "含税单价", -- I
  sales."含税合计" as "价税合计", -- J
  sales."销售部门" as "用友校对事业部", -- K
  sales."大类" as "商品大类", -- L
  sales."季节" as "季节", -- M
  sales."年份" as "年份", -- N
  sales."表头订单号" as "表头订单号", -- O
  sales."累计开票数量" as "开票数量", --R
  sales."累计开票金额" as "开票金额", --S
  sales."发票日期" as "发票日期", --T
  sales."发票号码" as "发票号码" --U
from "用友"."发货单列表" as sales;

/*
增加贴牌、辅料那一列 AB
v, w
*/
create or replace view "销售序时-类别" as
select
  sales.*,
  case
    when substring(sales."存货编码" from 1 for 1) = 'N' or substring(sales."存货编码" from char_length(sales.存货编码) for 1) = 'T' then '贴牌'
    when substring(sales."存货编码" from 1 for 1) = 'F' or substring(sales."存货编码" from 1 for 1) = 'T' then '辅料'
  end as "类别"  -- AB列
from "销售序时-用友数据" as sales;

create or replace view "销售序时-产品对照表-目录" as
select
  sales.*,
  prod_ref."产品" as "产品",
  case
    when sales."类别" = '贴牌' then prod_ref."商品单价"
    when sales."类别" != '贴牌' and substring(sales."存货编码" from char_length(sales."存货编码") - 1 for 2) = 'DY' then sales."含税单价"
    when sales."类别" != '贴牌' then sup_material."销售价"
    else 0
  end as "报价单-商品金额", -- AC
  case when sales."类别" = '贴牌' then prod_ref."服务费单价" else 0
  end as "报价单-服务费", -- AD
  case when sales."类别" = '贴牌' then prod_ref."服务费单价" / prod_ref."商品单价" else 0
  end as "报价单-服务费率", -- AE
  case
    when sales."类别" = '贴牌' then prod_ref."服务费单价"
    when substring(sales."存货编码" from char_length(sales."存货编码") - 1 for 2) = 'DY' then sup_material."销售价"
    else 0
  end as "结算单价", -- AF
  case when sales."类别" = '贴牌' then sales."数量" * prod_ref."商品单价" else 0 end as "商品金额" -- AN
from "销售序时-类别" as sales
left join "贴牌对照表" as prod_ref
  on sales."客户编码" = prod_ref."编码"
  and sales."存货编码" = prod_ref."存货编码"
  and prod_ref."id" in (select "id" from "贴牌对照表" as prod_ref2
   where prod_ref2."编码" = sales."客户编码"
    and prod_ref2."存货编码" = sales."存货编码"
    and prod_ref2."调价日期" < sales."发货日期"
    order by "调价日期" desc, "id" desc
    limit 1
    -- 可能有同一天调价多次的情况，选取 id 最大的
  )
left join "辅料对照表" as sup_material
  on sales."存货编码" = sup_material."辅料编码"
  and sup_material."id" in (select "id" from "辅料对照表" as sup_material2
    where sup_material2."辅料编码" = sales."存货编码"
    and sup_material2."调价日期" < sales."发货日期"
    order by "调价日期" desc, "id" desc
    limit 1
    -- 可能有同一天调价多次的情况，选取 id 最大的
  );

create materialized view if not exists "销售序时-总额" as
select
  sales.*,
  sales."含税单价" - sales."结算单价" as "单价核对", --AG
  case
    when sales."类别" = '贴牌' then sales."结算单价" / sales."报价单-商品金额"
    else 0
  end as "实际服务费率", -- AH
  case
    when sales."类别" = '贴牌' then sales."报价单-服务费" - sales."结算单价"
    else 0
  end as "报价服务费-实际服务费", --AI
  case
    when sales."类别" = '辅料' or substring(sales."存货编码" from char_length(sales."存货编码") - 1 for 2) = 'DY' then sales."结算单价" * sales."数量"
    else 0
  end as "辅料金额", -- AJ
  case
    when sales."类别" = '贴牌' then sales."结算单价" * sales."数量"
    else 0
  end as "服务费金额", -- AK
  case when sales."类别" = '贴牌' then sales."数量" else 0 end as "商标数" --AM
from "销售序时-产品对照表-目录" as sales;

create unique index if not exists "销售序时-总额_idx" on "销售序时-总额" ("id");
create or replace view "销售序时-发货单贴牌" as
select
  sales."发货单号" as "发货单号",
  sales."客户编码" as "客户编码",
  case
    when sales."类别" = '贴牌' then sales."存货编码"
    when substring(sales."存货编码" from char_length(sales."存货编码") - 1 for 2) = 'DY' then sales."对应贴牌"
    else null
  end as "发货单贴牌" -- AF
from "销售序时-总额" as sales;

create or replace view "销售序时-发货单产品" as
select
  sales_tiepai."发货单号" as "发货单号",
  sales_tiepai."客户编码" as "客户编码",
  sales_tiepai."发货单贴牌" as "发货单贴牌",
  cus_prod."产品" as "发货单产品"
from (select "发货单号", max("客户编码") as "客户编码", max("发货单贴牌") as "发货单贴牌" from "销售序时-发货单贴牌" where "发货单贴牌" is not null group by "发货单号") as sales_tiepai
left join "客户-存货-产品" as cus_prod
  on cus_prod."客户编码" = sales_tiepai."客户编码"
  and cus_prod."存货编码" = sales_tiepai."发货单贴牌";

create or replace view "销售序时-发货单项目" as
select
  sales_chanpin."发货单号" as "发货单号",
  sales_chanpin."客户编码" as "客户编码",
  sales_chanpin."发货单贴牌" as "发货单贴牌",
  sales_chanpin."发货单产品" as "发货单产品",
  prod_depart."项目" as "项目",
  prod_depart."事业部群" as "事业部群"
from "销售序时-发货单产品" as sales_chanpin
left join "产品-部门" as prod_depart
  on prod_depart."产品" = sales_chanpin."发货单产品";

create or replace view "销售序时" as
select
  sales."id" as "id",
  sales."发货日期" as "发货日期", -- A
  sales."销售类型编码" as "销售类型编码", --这个是后来他们要求加上的，只筛选01的，但是可能以后有别的
  sales."发货单号" as "发货单号", -- B
  sales."客户编码" as "客户编码", -- C
  sales."客户名称" as "客户名称", -- D
  sales."存货编码" as "存货编码", -- E
  /*sales."产品" as "产品",*/
  sales_prod."发货单产品" as "产品",
  sales_prod."项目" as "项目",
  sales_prod."事业部群" as "事业部群",
  pay_hand."产品-手工" as "产品-手工",
  /*prod_depart."项目" as "项目",*/
  /*prod_depart."事业部群" as "事业部群",*/
  sales."对应贴牌" as "对应贴牌", -- F
  sales."商品名称" as "商品名称", -- G
  sales."数量" as "数量", -- H
  sales."含税单价" as "含税单价", --I
  sales."价税合计" as "价税合计", --J
  sales."用友校对事业部" as "用友校对事业部", --K
  sales."商品大类" as "商品大类", -- L
  sales."季节" as "季节", -- M
  sales."年份" as "年份", -- N
  sales."表头订单号" as "表头订单号", -- O
  pay_hand."发票日期" as "发票日期", -- T
  pay_hand."发票号码" as "发票号码", -- U
  sales."开票数量" as "已开票数量",
  sales."开票金额" as "已开票金额",
  sales."数量" - sales."开票数量" as "未开票数量", -- V
  sales."价税合计" - sales."开票金额" as "未开票金额", -- W
  sales."类别" as "类别", --AB
  sales."报价单-商品金额" as "报价单-商品金额", --AC
  sales."报价单-服务费" as "报价单-服务费", --AD
  sales."报价单-服务费率" as "报价单-服务费率", -- AE
  sales."结算单价" as "结算单价", -- AF
  sales."单价核对" as "单价核对", -- AG
  pay_hand."备注" as "备注", -- when 结算单价 <> 单价核对
  sales."实际服务费率" as "实际服务费率", -- AH
  sales."报价服务费-实际服务费" as "报价服务费-实际服务费", -- AI
  sales."辅料金额" as "辅料金额", -- AJ
  sales."服务费金额" as "服务费金额", -- AK
  sales."辅料金额" + sales."服务费金额" as "应收款合计", -- AL
  sales."商标数" as "商标数", -- AM
  sales."商品金额" as "商品金额", -- AN
  pay_hand."修改人员" as "修改人员",
  pay_hand."修改时间" as "修改时间"
from "销售序时-总额" as sales
left join "销售序时-发货单项目" as sales_prod
    on sales_prod."发货单号" = sales."发货单号"
--    and sales_prod."客户编码" = sales."客户编码"
left join "销售序时-手工" as pay_hand
    on pay_hand."id" = sales."id";

-- upsert 备注 in 销售序时 => 销售序时-手工
create or replace function sales_update_row() returns trigger as
$$
begin
    insert into "销售序时-手工" ("id", "备注", "发票日期", "发票号码", "产品-手工", "修改人员", "修改时间")
      values (new."id", new."备注", new."发票日期", new."发票号码", new."产品-手工", new."修改人员", new."修改时间")
    on conflict ("id") do
      update set
        "备注" = new."备注",
        "发票日期" = new."发票日期",
        "发票号码" = new."发票号码",
        "产品-手工" = new."产品-手工",
        "修改人员" = new."修改人员",
        "修改时间" = current_timestamp;
    return new;
end;
$$ language plpgsql;

drop trigger if exists update_sales on "销售序时";
create trigger update_sales
  instead of update on "销售序时"
  for each row
    execute procedure sales_update_row();

create or replace view "收付款序时-客户-产品" as
  select
    payments."id" as "id",
    payments."单号" as "单号",
    payments."日期" as "日期",
    payments."凭证类型" as "凭证类型",
    payments."对方科目" as "对方科目",
    payments."客户编码" as "客户编码",
    customers."客户名称" as "客户名称",
    payments."服务费" as "服务费",
    payments."辅料费" as "辅料费",
    payments."服务费开票金额" as "服务费开票金额",
    pay_prod_depart."服务费发票号码" as "服务费发票号码",
    payments."辅料费开票金额" as "辅料费开票金额",
    pay_prod_depart."辅料费发票号码" as "辅料费发票号码",
    pay_prod_depart."产品" as "产品", -- editable
    pay_prod_depart."项目" as "项目",
    pay_prod_depart."事业部群" as "事业部群",
    payments."摘要" as "摘要",
    payments."创建时间" as "创建时间",
    pay_prod_depart."修改人员" as "修改人员",
    pay_prod_depart."修改时间" as "修改时间"
  from "用友"."收付款序时" as payments
  left join "用友"."客户档案" as customers
    on payments."客户编码" = customers."客户编码"
  left join (
    select
      pay_prod."id" as "id",
      pay_prod."产品" as "产品",
      prod_depart."项目" as "项目",
      prod_depart."事业部群" as "事业部群",
      pay_prod."服务费发票号码" as "服务费发票号码",
      pay_prod."辅料费发票号码" as "辅料费发票号码",
      pay_prod."修改人员" as "修改人员",
      pay_prod."修改时间" as "修改时间"
    from "收付款序时-手工" as pay_prod
    left join "产品-部门" as prod_depart
      on pay_prod."产品" = prod_depart."产品") as pay_prod_depart
    on payments."id" = pay_prod_depart."id";

create or replace view "收付款序时" as
  select
    pay_cus_prod."id" as "id",
    pay_cus_prod."单号" as "单号",
    pay_cus_prod."日期" as "日期",
    pay_cus_prod."凭证类型" as "凭证类型",
    pay_cus_prod."客户编码" as "客户编码",
    pay_cus_prod."客户名称" as "客户名称",
    pay_cus_prod."服务费" as "服务费",
    pay_cus_prod."辅料费" as "辅料费",
    pay_cus_prod."服务费开票金额" as "服务费开票金额",
    pay_cus_prod."服务费发票号码" as "服务费发票号码",
    pay_cus_prod."辅料费开票金额" as "辅料费开票金额",
    pay_cus_prod."辅料费发票号码" as "辅料费发票号码",
    pay_cus_prod."产品" as "产品",-- editable as -- editable
    pay_cus_prod."项目" as "项目",
    pay_cus_prod."事业部群" as "事业部群",
    case
      when pay_cus_prod."凭证类型" = '银收' or pay_cus_prod."凭证类型" = '银付' or pay_cus_prod."凭证类型" = '现收' or pay_cus_prod."凭证类型" = '现付' then '现金'
      when pay_cus_prod."凭证类型" = '转账' and pay_cus_prod."对方科目" like '%112297%' then '冲抵'
      else '现金'
    end as "现金/冲抵",
    pay_cus_prod."摘要" as "摘要",
    pay_cus_prod."创建时间" as "创建时间",
    pay_cus_prod."修改人员" as "修改人员",
    pay_cus_prod."修改时间" as "修改时间"
  from "收付款序时-客户-产品" as pay_cus_prod;

create or replace function pay_prod_update_row() returns trigger as
$$
  begin
    insert into "收付款序时-手工" ("id", "产品", "服务费发票号码", "辅料费发票号码", "修改人员" , "修改时间")
      values (new."id", new."产品", new."服务费发票号码", new."辅料费发票号码", new."修改人员" , new."修改时间")
    on conflict ("id") do update set
      "产品" = new."产品",
      "服务费发票号码" = new."服务费发票号码",
      "辅料费发票号码" = new."辅料费发票号码",
      "修改人员" = new."修改人员",
      "修改时间" = current_timestamp;
    return new;
  end;
$$ language plpgsql;

drop trigger if exists update_pay_prod on "收付款序时";
create trigger update_pay_prod
  instead of update on "收付款序时"
    for each row
      execute procedure pay_prod_update_row();

create or replace view "收付款序时-上年" as
  select
    payments2."id" as "id",
    payments2."凭证类型" as "凭证类型",
    payments2."客户编码" as "客户编码",
    customers."客户名称" as "客户名称",
    payments2."摘要" as "摘要",
    payments2."上年服务费余额" as "上年服务费余额",
    payments2."上年辅料费余额" as "上年辅料费余额",
    payments2."上年快递费余额" as "上年快递费余额",
    payments2."本年快递费" as "本年快递费",
    payments2."产品" as "产品",
    prod_depart."项目" as "项目",
    prod_depart."事业部群" as "事业部群",
    payments2."现金/冲抵" as "现金/冲抵"
  from "用友"."收付款序时-上年" as payments2
  left join "用友"."客户档案" as customers
    on customers."客户编码" = payments2."客户编码"
  left join "产品-部门" as prod_depart
    on prod_depart."产品" = payments2."产品";

create or replace function payments_lastyear_update_row() returns trigger as
  $$
  begin
      insert into "用友"."收付款序时-上年" ("凭证类型", "客户编码", "摘要", "上年服务费余额", "上年辅料费余额", "上年快递费余额", "本年快递费", "产品", "现金/冲抵")
        values(new."凭证类型", new."客户编码", new."摘要", new."上年服务费余额", new."上年辅料费余额", new."上年快递费余额", new."本年快递费", new."产品", new."现金/冲抵")
      on conflict("id") do update set
        "产品" = new."产品",
        "凭证类型" = new."凭证类型",
        "客户编码" = new."客户编码",
        "摘要" = new."摘要",
        "上年服务费余额" = new."上年服务费余额",
        "上年辅料费余额" = new."上年辅料费余额",
        "上年快递费余额" = new."上年快递费余额",
        "本年快递费" = new."本年快递费",
        "产品" = new."产品",
        "现金/冲抵" = new."现金/冲抵";
    return new;
  end;
  $$ language plpgsql;

drop trigger if exists update_payments_lastyear on "收付款序时-上年";
create trigger update_payments_lastyear
  instead of update on "收付款序时-上年"
  for each row
      execute procedure payments_lastyear_update_row();

create trigger insert_payments_lastyear
  instead of insert on "收付款序时-上年"
  for each row
      execute procedure payments_lastyear_update_row();

create or replace view "小部门余额表" as
  select
    sales."事业部群",
    sales."项目",
    sales."产品",
    sales."客户编码",
    sum(sales."服务费") as "服务费",
    sum(sales."辅料费") as "辅料费",
    sum(sales."服务费开票金额") as "服务费开票金额",
    sum(sales."辅料费开票金额") as "辅料费开票金额"
  from "收付款序时" as sales
  group by sales."事业部群", sales."项目", sales."产品", sales."客户编码";

create or replace view "小部门余额表-小计" as
  select
    balance."项目" as "项目",
    sum(balance."服务费") as "服务费",
    sum(balance."辅料费") as "辅料费",
    sum(balance."服务费开票金额") as "服务费开票金额",
    sum(balance."辅料费开票金额") as "辅料费开票金额"
  from "小部门余额表" as balance
  group by balance."项目";
