import localization from '../../../localization';

const defaultShow = {
  name: true,
  rights: true,
  conditionsOfAvailabilty: true,
  createDate: true,
  updateDate: true,
};

const markUp = {
  headers: [
    { value: localization.t('labels.name'), id: 'name', sortParam: 'name' },
    {
      value: localization.t('labels.rights'),
      id: 'rights',
    },
    {
      value: localization.t('labels.conditionsOfAvailabilty'),
      id: 'conditionsOfAvailabilty',
    },
    {
      value: localization.t('labels.createDate'),
      id: 'createDate',
      sortParam: 'createDate',
    },
    {
      value: localization.t('labels.lastUpdate'),
      id: 'updateDate',
      sortParam: 'updateDate',
    },
  ],
};

const generateData = (data) => {
  const values = data.items.map((val) => {
    const actionsAmount = [];
    val.rights.forEach((item) => {
      actionsAmount.push(...item.actions);
    });
    return {
      id: val.id,
      name: val.name,
      rights: `${actionsAmount.length || 0} actions in ${
        val.rights.length || 0
      } services`,
      conditionsOfAvailabilty: `${
        val.availabilityConditions?.length || 0
      } conditions`,
      createDate: val.createDate,
      updateDate: val.updateDate,
    };
  });

  const meta = {
    totalPages: data.totalPages,
  };

  Object.assign(markUp, { values, meta, defaultShow });
  return markUp;
};

export { generateData, defaultShow, markUp };
