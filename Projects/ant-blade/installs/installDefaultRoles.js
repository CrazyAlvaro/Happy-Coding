import _ from 'lodash';
import {
  SALE_FIN,
  SALE_ENT,
  REV_FIN,
  REV_ENT,
} from '../common/roleConstants';
import Role from '../server/auth/models/role';

const options = {
  upsert: true,
  new: true,
};

function addRoleConnection(childName, childType, parentName, parentType) {
  return new Promise((resolve, reject) => {
    const line = `adding ${childName}:${childType} as child of ${parentType}:${parentType}`;
    console.time(line);
    Role.findOneAndUpdate({
      roleName: childName,
      roleType: childType,
    }, { /* no updates */ }, options, (err1, doc) => {
      if (err1) {
        reject(err1);
      } else {
        Role.findOneAndUpdate({
          roleName: parentName,
          roleType: parentType,
        }, {
          $addToSet: {
            childRoles: doc._id,
          },
        }, options, (err2, r2) => {
          if (err2) {
            reject(err2);
          } else {
            console.timeEnd(line);
            resolve(r2);
          }
        });
      }
    });
  });
}

// 收付款
function addFinRoles() {
  return Promise.all(_({
    儿童服饰事业部: '财务事业部3',
    儿童内衣事业部: '财务事业部3',
    儿童用品事业部: '财务事业部3',
    儿童玩具事业部: '财务事业部3',
    孕妇装事业部: '财务事业部3',
    童鞋事业部: '财务事业部3',
    婴装事业部: '财务事业部3',
    洗护快消事业部: '财务事业部3',
    综合用品事业部: '财务事业部3',
    特色内衣事业部: '财务事业部1',
    内裤事业部: '财务事业部1',
    棉袜事业部: '财务事业部1',
    美体事业部: '财务事业部1',
    丝袜及打底裤事业部: '财务事业部1',
    基础内衣事业部: '财务事业部1',
    文胸及塑身事业部: '财务事业部1',
    家居服事业部: '财务事业部1',
    '公司-其他事业部': '财务事业部1',
    保暖内衣事业部: '财务事业部1',
    运动事业部: '财务事业部1',
    线下事业部: '财务事业部1',
    大内衣事业部: '财务事业部1',
    裤袜事业部: '财务事业部1',
    服饰配件事业部: '财务事业部4',
    芯类事业部: '财务事业部4',
    居家布艺事业部: '财务事业部4',
    箱包皮具事业部: '财务事业部4',
    套件事业部: '财务事业部4',
    毯垫席帐事业部: '财务事业部4',
    鞋品事业部: '财务事业部4',
    V生活事业部: '财务事业部4',
    T恤事业部: '财务事业部2',
    衬衫事业部: '财务事业部2',
    电购及礼品事业部: '财务事业部2',
    服装中心事业部: '财务事业部2',
    户外事业部: '财务事业部2',
    毛衫事业部: '财务事业部2',
    男裤事业部: '财务事业部2',
    女裤事业部: '财务事业部2',
    外套事业部: '财务事业部2',
    羽绒事业部: '财务事业部2',
    智能家电事业部: '财务事业部2',
    智能居家事业部: '财务事业部2',
    毛衫T恤事业部: '财务事业部2',
    衬衫棉衣事业部: '财务事业部2',
    羽绒外套事业部: '财务事业部2',
    休闲裤羽绒裤事业部: '财务事业部2',
    休闲裤大衣事业部: '财务事业部2',
    打底裤恤衫事业部: '财务事业部2',
    居家日用事业部: '财务事业部2',
    户外运动事业部: '财务事业部2',
    针织衫连衣裙事业部: '财务事业部2',
    羽绒服妈妈装事业部: '财务事业部2',
    个人护理保健按摩器材: '财务事业部2',
    生活家电事业部: '财务事业部2',
    餐饮具事业部: '财务事业部2',
    牛仔裤事业部: '财务事业部2',
    卫衣皮草事业部: '财务事业部2',
    衬衫牛仔裤事业部: '财务事业部2',
    时尚女装事业部: '财务事业部2',
    汽车用品事业部: '财务事业部2',
    '卫衣-皮草事业部': '财务事业部2',
    'NEW 南极人': '财务事业部2',
    收纳整理事业部: '财务事业部2',
    休闲裤羽绒服事业部: '财务事业部2',
  })
  .toPairs()
  .map(([child, parent]) => addRoleConnection(child, REV_ENT, parent, REV_FIN))
  .value());
}

// 销售
function addSalesRoles() {
  return Promise.all(_({
    母婴中心: '财务事业部3',
    儿童内衣事业部: '财务事业部3',
    儿童玩具事业部: '财务事业部3',
    孕妇装事业部: '财务事业部3',
    婴装事业部: '财务事业部3',
    洗护快消事业部: '财务事业部3',
    儿童服饰事业部: '财务事业部3',
    综合用品事业部: '财务事业部3',
    美体事业部: '财务事业部1',
    基础内衣事业部: '财务事业部1',
    特色内衣事业部: '财务事业部1',
    文胸及塑身事业部: '财务事业部1',
    棉袜事业部: '财务事业部1',
    内裤事业部: '财务事业部1',
    保暖内衣事业部: '财务事业部1',
    产品研究院: '财务事业部1',
    '内衣-运动事业部': '财务事业部1',
    丝袜及打底裤事业部: '财务事业部1',
    家居服事业部: '财务事业部1',
    毯垫席帐事业部: '财务事业部4',
    鞋品事业部: '财务事业部4',
    套件事业部: '财务事业部4',
    芯类事业部: '财务事业部4',
    服饰配件事业部: '财务事业部4',
    箱包皮具事业部: '财务事业部4',
    居家布艺事业部: '财务事业部4',
    V生活事业部: '财务事业部4',
    外套事业部: '财务事业部2',
    '服装-女装事业1部': '财务事业部2',
    '服装-女装事业2部': '财务事业部2',
    '服装-男装事业1部': '财务事业部2',
    智能家电事业部: '财务事业部2',
    智能居家事业部: '财务事业部2',
    '服装-户外事业部': '财务事业部2',
    '服装-男装事业2部': '财务事业部2',
    T恤事业部: '财务事业部2',
    羽绒事业部: '财务事业部2',
    '女装-户外事业部': '财务事业部2',
    '打底裤-恤衫': '财务事业部2',
    '毛衫-T恤': '财务事业部2',
    '休闲裤-羽绒裤': '财务事业部2',
    '休闲裤-大衣': '财务事业部2',
    '羽绒-外套': '财务事业部2',
    居家日用: '财务事业部2',
    户外运动: '财务事业部2',
    '衬衫-棉衣': '财务事业部2',
    个人护理保健按摩器材: '财务事业部2',
    牛仔裤: '财务事业部2',
    '衬衫-牛仔裤': '财务事业部2',
    '卫衣-皮草': '财务事业部2',
    收纳整理: '财务事业部2',
    时尚女装: '财务事业部2',
    汽车用品: '财务事业部2',
    'NEW-南极人': '财务事业部2',
    '羽绒服-妈妈装': '财务事业部2',
    餐饮具: '财务事业部2',
  })
  .toPairs()
  .map(([child, parent]) => addRoleConnection(child, SALE_ENT, parent, SALE_FIN))
  .value());
}

export default function installDefaultRoles() {
  return Promise.all([
    addSalesRoles(),
    addFinRoles(),
  ]);
}