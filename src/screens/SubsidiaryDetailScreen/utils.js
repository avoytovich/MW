import moment from 'moment-timezone';

const getTimeZones = () => {
  const names = moment.tz.names();
  const options = names.map((zone) => {
    const value = `${zone} (${moment().tz(zone).format('Z')})`;
    return ({ value, id: zone });
  });
  return options;
};

const exemptionPolicyOptions = [{ id: 'B2B', value: 'B2B' }, { id: 'NEVER', value: 'NEVER' }, { id: 'B2B_SAME_COUNTRY', value: 'B2B SAME COUNTRY' }];

export { getTimeZones, exemptionPolicyOptions };
