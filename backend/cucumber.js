let common = [
  'features/**/*.feature',
  '--require-module ts-node/register',
  '--require features/step-definitions/**/*.ts',
  '--format html:cucumber-report.html',
  '--publish-quiet',
].join(' ');

module.exports = {
  default: common,
};
