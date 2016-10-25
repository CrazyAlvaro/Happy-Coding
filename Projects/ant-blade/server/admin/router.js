import { Router } from 'express';
import _ from 'lodash';
import { UserProfile, Role } from '../auth/models';

// eslint-disable-next-line new-cap
const router = Router();
export default router;

// list all users
router.route('/user')
  .get(async (req, res) => {
    const users = await UserProfile.find();
    res.json(users);
  });

// get all info about a user
router.route('/user/:username')
  .get(async (req, res) => {
    const { username } = req.params;
    const user = await UserProfile.findOne({ username }).populate({
      path: 'roles',
      populate: { path: 'childRoles' },
    });
    res.json(user);
  })
  .delete(async (req, res) => {
    const { username } = req.params;
    await UserProfile.remove({ username });
    res.sendStatus(204);
  });

// get all roles for a unser
router.route('/user/:username/role')
  .get(async (req, res) => {
    const {
      username,
    } = req.params;
    const user = await UserProfile.findOne({ username }).populate({
      path: 'roles',
      populate: { path: 'childRoles' },
    });
    res.json(user.roles);
  });

// set a given user of a given role
router.route('/user/:username/role/:roletype/:rolename')
  .put(async (req, res) => {
    const {
      username,
      roletype: roleType,
      rolename: roleName,
    } = req.params;
    const role = await Role.findOne({ roleName, roleType }).select('_id');
    if (!role) {
      res.sendStatus(400);
    } else {
      const old = await UserProfile.findOneAndUpdate({ username }, {
        $addToSet: { roles: role._id },
      });
      if (!!old) {
        res.sendStatus(201);
      } else {
        res.sendStatus(400);
      }
    }
  })
  .delete(async (req, res) => {
    const {
      username,
      roletype: roleType,
      rolename: roleName,
    } = req.params;
    const role = await Role.findOne({ roleName, roleType }).select('_id');
    if (!role) {
      res.sendStatus(404);
    } else {
      const old = await UserProfile.findOneAndUpdate({ username }, {
        $pull: { roles: role._id },
      });
      if (!!old) {
        res.sendStatus(204);
      } else {
        res.sendStatus(400);
      }
    }
  });

// get all roles
router.route('/role')
  .get(async (req, res) => {
    const roles = await Role.find().populate('childRoles');
    res.json(roles);
  });

router.route('/role/:roletype')
  .get(async (req, res) => {
    const { roletype: roleType } = req.params;
    const roles = await Role
      .find({ roleType }, null, { sort: { roleName: 1 } })
      .populate('childRoles');
    res.json(roles);
  });

router.route('/role/:roletype/:rolename')
  .get(async (req, res) => {
    const {
      roletype: roleType,
      rolename: roleName,
    } = req.params;
    const roles = await Role.findOne({ roleType, roleName }).populate('childRoles');
    res.json(roles);
  })
  .put(async (req, res) => {
    const {
      roletype: roleType,
      rolename: roleName,
    } = req.params;
    const query = { roleName, roleType };
    try {
      const created = await Role.findOneAndUpdate(query, query, { upsert: true });
      res.status(201).json(created);
    } catch (e) {
      res.sendStatus(400);
    }
  })
  .delete(async (req, res) => {
    const {
      roletype: roleType,
      rolename: roleName,
    } = req.params;
    const role = await Role.findOne({
      roleType,
      roleName,
    });
    if (role && _.isEmpty(role.childRoles)) {
      const dependentUsers = await UserProfile.count({
        roles: role._id,
      });
      if (dependentUsers === 0) {
        const removed = await role.remove();
        // also remove parents' linkages
        const parents = await Role.find({ childRoles: removed._id });
        for (const parent of parents) {
          await parent.update({
            $pull: { childRoles: removed._id },
          });
        }
        return res.sendStatus(204);
      }
      return res.status(400).json({ error: '该角色有依赖的用户，因而不能删除' });
    }
    return res.status(400).json({ error: '该角色不存在或有依赖的子角色，因而不能删除' });
  });

// get all users of a given role
router.route('/role/:roletype/:rolename/user')
  .get(async (req, res) => {
    const {
      rolename: roleName,
      roletype: roleType,
    } = req.params;
    const role = await Role.findOne({ roleName, roleType }).select('_id');
    if (role) {
      const users = await UserProfile.find({ roles: role._id });
      res.json(users);
    } else {
      res.status(400).json({ error: '该角色不存在' });
    }
  });

router.route('/role/:roletype/:rolename/child')
  .get(async (req, res) => {
    const {
      rolename: roleName,
      roletype: roleType,
    } = req.params;
    const childRoles = await Role
      .findOne({ roleName, roleType })
      .populate('childRoles')
      .select('childRoles');
    res.json(childRoles);
  });

// set child role for a role
router.route('/role/:roletype/:rolename/child/:childroletype/:childrolename')
  .put(async (req, res) => {
    const {
      rolename: roleName,
      roletype: roleType,
      childroletype: childRoleType,
      childrolename: childRoleName,
    } = req.params;
    const childRole = await Role.findOne({
      roleName: childRoleName,
      roleType: childRoleType,
    }).select('_id');
    if (!childRole) {
      res.sendStatus(400);
    } else {
      const old = await Role.findOneAndUpdate({ roleName, roleType }, {
        $addToSet: { childRoles: childRole._id },
      });
      if (!!old) {
        res.sendStatus(201);
      } else {
        res.sendStatus(400);
      }
    }
  })
  .delete(async (req, res) => {
    const {
      rolename: roleName,
      roletype: roleType,
      childroletype: childRoleType,
      childrolename: childRoleName,
    } = req.params;
    const childRole = await Role.findOne({
      roleName: childRoleName,
      roleType: childRoleType,
    }).select('_id');
    if (!childRole) {
      res.sendStatus(400);
    } else {
      const old = await Role.findOneAndUpdate({ roleName, roleType }, {
        $pull: { childRoles: childRole._id },
      });
      if (!!old) {
        res.sendStatus(204);
      } else {
        res.sendStatus(400);
      }
    }
  });
