import { User } from '../models'
import HashPassword from '../middlewares/hashPassword';
import Authenticate from '../middlewares/authenticate';
import ComparePassword from '../middlewares/comparePassword';

class AuthController {
  static async signup(req, res) {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        return res.status(400).json({ status: 'error', message: 'All fields are required' });
      }
      
      const hashPassword = await HashPassword(password);
      const [user, created] = await User.findOrCreate({
        where: { email: email },
        defaults: {
          password: hashPassword,
        },
      });

      if (created) {
        const token = await Authenticate(user);

        return res.status(200).json({ user, token, status: 'success' });
      }

      if (user) {
        return res
          .status(400)
          .json({ status: 'error', message: 'A user exist with this email' });
      }
    } catch (error) {
      return res.status(500).json({ status: 'error', message: error.message });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        return res
          .status(400)
          .json({ status: 'error', message: 'All fields are required' });
      }

      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        return res
          .status(404)
          .json({ status: 'error', message: 'This user does not exist' });
      }

      const match = await ComparePassword(password, user.password);
      if (!match) {
        return res
          .status(401)
          .json({ status: 'error', message: 'incorrect email or password' });
      }

      const token = await Authenticate(user);

      return res.status(200).json({ user, token, status: 'success' });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: error.message });
    }
  }
}

export default AuthController;