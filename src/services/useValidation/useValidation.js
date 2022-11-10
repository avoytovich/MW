import { useState, useEffect } from 'react';
import { sectionsValidation, additionalValidation } from './validationConfig';

const useValidation = (
  curSection,
  sectionLabels,
  curData,
  scope,
) => {
  const [errors, setErrors] = useState({});
  const [checkedSections, setCheckedSections] = useState([]);
  const handleSetErrors = (hasError, section, field) => {
    if (hasError && !errors?.[section]?.includes(field)) {
      setErrors({
        ...errors,
        [section]: errors?.[section] ? [
          ...errors?.[section],
          field] : [field],
      });
    } else if (!hasError && errors?.[section]?.includes(field)) {
      const newArray = [...errors?.[section]]?.filter((el) => el !== field);
      if (newArray.length) {
        setErrors({
          ...errors,
          [section]: newArray,
        });
      } else {
        const newErrors = { ...errors };
        delete newErrors?.[section];
        setErrors(newErrors);
      }
    }
  };

  const handleValidate = (sections) => {
    const newErrors = { ...errors };
    const newCheckedSections = [...checkedSections];
    const sectionsToValidate = sectionsValidation?.[scope];

    sections.forEach((section) => {
      newCheckedSections.push(section);
      if (sectionsToValidate?.[section] && !checkedSections.includes(section)) {
        const sectionErrors = sectionsToValidate[section].filter((item) => !curData[item]);
        if (sectionErrors.length) { newErrors[section] = [...sectionErrors]; }
      }
    });
    if (additionalValidation[scope]) {
      const res = additionalValidation[scope](curData);
      res.forEach((it) => {
        if (it.section) {
          newErrors[it.section].push(it.field);
        }
      });
    }

    setErrors(newErrors);
    setCheckedSections(newCheckedSections);
  };
  useEffect(() => {
    const sectionIndex = curSection;
    if (sectionIndex > 0) {
      const newArray = sectionLabels.slice(0, sectionIndex);
      const validateSections = [];
      newArray.forEach((it) => {
        if (!checkedSections.includes(it)) {
          validateSections.push(it);
        }
      });

      if (validateSections.length) {
        handleValidate(validateSections);
      }
    }
  }, [curSection]);

  return { errors, handleSetErrors, setErrors };
};

export default useValidation;
