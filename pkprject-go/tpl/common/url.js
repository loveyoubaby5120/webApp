export function build(url, query) {
  if (!query) {
    return url;
  }
  const components = Object.keys(query).map(k => {
    const v = query[k];
    if (!v && !(typeof v === 'number' && v === 0)) {
      return;
    }
    return encodeURIComponent(k) + '=' + encodeURIComponent(v);
  }).filter(c => c);
  if (!components || components.length === 0) {
    return url;
  }
  return url + '?' + components.join('&');
}

export let buildURL = build;

export function buildLoc(path, query) {
  return {
    pathname: path,
    query: query,
  };
}

export function googleMaps(address) {
  return build('https://www.google.com/maps', { q: address });
}

export function bizProgramList(siteID, kind) {
  return build('/manage/biz/' + siteID + '/list', { kind: kind });
}

export function bizProgramAdd(siteID, kind) {
  return build('/manage/biz/' + siteID + '/add', { kind: kind });
}

export function bizProgramEdit(siteID, programID, view) {
  return build('/manage/biz/' + siteID + '/edit', { id: programID, view: view });
}

export function bizContentList(siteID, stream, q) {
  return build('/manage/biz/' + siteID + '/content/list', { stream: stream, q: q });
}

export function bizContentEdit(siteID, threadID) {
  return '/manage/biz/' + siteID + '/content/edit/' + encodeURIComponent(threadID);
}

export function bizContentView(siteID, stream, threadID) {
  var prefix = ""
  if (siteID === "cn.tsinghua") {
    prefix = '/tsinghua'
  }
  if (stream.indexOf(".en", stream.length - 3) !== -1) {
    prefix += '/en'
  }
  return prefix + '/news/' + stream + '/' + encodeURIComponent(threadID)
}

export function bizContentNew(siteID, stream) {
  return build('/manage/biz/' + siteID + '/content/new', { stream: stream });
}

export function manageInstitute(id, instituteKind) {
  return build('/kb/manage/institute', { kind: instituteKind, id: id });
}

export function manageProgramListByInstitute(id, programKind) {
  return build('/kb/manage/program/list', { kind: programKind, institute_id: id });
}

export function manageProgramListByInstituteAndOpportunityKind(id, programKind, opportunityKind) {
  return build('/kb/manage/program/list', { kind: programKind, institute_id: id, oppokind: opportunityKind });
}

export function manageProgram(id, programKind) {
  return build('/kb/manage/program', { kind: programKind, id: id });
}

export function manageProgramDeadline(id, programKind) {
  return build('/kb/manage/program', { kind: programKind, id: id, view: 'task' });
}

export function manageProgramAddUnderInstitute(instituteID, programKind) {
  return build('/kb/manage/program/add', { kind: programKind, institute_id: instituteID });
}

export function manageProgramCSVExport(instituteID) {
  return build('/kb/manage/program/csv_export', { institute_id: instituteID });
}

export function manageProgramCSVImport(instituteID) {
  return build('/kb/manage/program/csv_import', { institute_id: instituteID });
}

export function manageDeadlineByProgramAndIndex(programID, index) {
  return build('/kb/manage/deadline', { program_id: programID, index: index });
}

export function manageInstituteRanking(key, page) {
  return build('/kb/manage/institute/ranking', { key: key, page: page });
}

export function manageInstituteRegionFosRanking(region, key, page) {
  return build('/kb/manage/institute/ranking', { region: region, key: key, page: page });
}

export function manageCareer(key) {
  return build('/config/manage/career', { key: key });
}

export function manageCase(key) {
  return build('/config/manage/case', { key: key });
}

export function manageFieldOfStudy(key) {
  return build('/config/manage/field_of_study', { key: key });
}
