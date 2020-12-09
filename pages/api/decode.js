import { magic } from '../../lib/magic';

export default async function decode(req, res) {
  try {
    const didToken = req.headers.authorization.substr(7);
    const [proof, claim] = magic.token.decode(didToken);
    res.json({ proof, claim });
  } catch (error) {
    res.json({ decoded: false });
  }
}
