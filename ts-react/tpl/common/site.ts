interface LocalizedString {
  'zh-cn' : string;
  'en-us' : string;
}

interface TagLabel {
  Caption : LocalizedString
}

interface Stream {
  Key : string;
  BackendCaption : string;
}

export interface Site {
  OpportunityKindKeys : string[];
  OpportunityKindMap : { [key : string] : TagLabel };

  StreamKeys : string[];
  StreamMap : { [key : string] : Stream };

  AdminTagKey : string;
  ID : string;
}