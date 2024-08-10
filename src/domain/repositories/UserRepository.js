const RepositoryBase = require('../../Data/Repository');
const User = require('../../domain/Models/User');
const Follower = require('../../domain/Models/Follower');
const { Op } = require('sequelize');

class UserRepository extends RepositoryBase {
  constructor() {
    super(User);
  }

  async getAll() {
    try {
      return await this.model.findAll();
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      return await this.model.findByPk(id);
    } catch (error) {
      throw error;
    }
  }

  async create(data) {
    try {
      return await this.model.create(data);
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const user = await this.model.findByPk(id);
      if (!user) throw new Error('User Not Found');
      await user.update(data);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      const user = await this.model.findByPk(id);
      if (!user) throw new Error('User Not Found');
      await user.destroy();
      return user;
    } catch (error) {
      throw error;
    }
  }

  async exist(email, username) {
    try {
      return await this.model.findOne({
        where: {
          [Op.or]: [
            { email },
            { username }
          ]
        }
      });
    } catch (error) {
      console.error('Error finding user:', error);
      throw error;
    }
  }

  async login(username, password) {
    try {
      return await this.model.findOne({
        where: {
          [Op.and]: [
            { username },
            { password }
          ]
        }
      });
    } catch (err) {
      throw err;
    }
  }

  async followUser(followerid, followingid) {
    try {
      const follower = await this.getById(followerid);
      const following = await this.getById(followingid);
      if (follower && following) {
        await Follower.findOrCreate({
          where: { followerid, followingid },
        });
      }
    } catch (err) {
      console.error('Error in followUser:', err);
      throw err;
    }
  }

  async getFollowers(userId) {
    return await Follower.findAll({
      where: { followingid: userId },
      include: [{ model: User, as: 'follower' }],
    });
  }

  async getFollowing(userId) {
    return await Follower.findAll({
      where: { followerId: userId },
      include: [{ model: User, as: 'following' }],
    });
  }

  async getFollowerCount(userId) {
    return await Follower.count({ where: { followingid: userId } });
  }

  async findByUsername(username) {
    try {
      return await this.model.findOne({
        where: {
          username
        }
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserRepository;