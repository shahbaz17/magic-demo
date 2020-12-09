import { magic } from '../../lib/magic';

export default async function validate(req, res) {
  const didToken = req.headers.authorization.substr(7);
  try {
    await magic.token.validate(didToken, 'something');
  } catch (error) {
    try {
      await magic.token.validate(didToken);
    } catch (error) {
      res.json({ isValid: false });
    }
  }
  let issuer = await magic.token.getIssuer(didToken);
  let metadata = await magic.users.getMetadataByIssuer(issuer);
  res.json({ isValid: true, issuer, metadata });
}
