import Axios from '../config';

const root = '/api';

function GenerateProof(data) {
  return Axios({
    url: `${root}/generateProof`,
    method: 'get',
    params: data,
  });
}
function Verify(data) {
  return Axios({
    url: '/verify/',
    method: 'post',
    data,
  });
}
export default {
  GenerateProof,
  Verify,
};
