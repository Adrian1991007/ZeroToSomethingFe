const generateEditions = (years) => {
  const editions = [];
  const currentYear = new Date().getFullYear();
  let firstEdition = currentYear - years;

  for (firstEdition; firstEdition < currentYear; firstEdition++) {
    const edition = {
      id: `${firstEdition}-${firstEdition + 1}`,
    };
    editions.push(edition);
  }
  return editions;
};

const getStaffMemberFullName = (staffMember) => {
  return staffMember ? `${staffMember.lastName} ${staffMember.firstName}` : '';
};

export { generateEditions, getStaffMemberFullName };
