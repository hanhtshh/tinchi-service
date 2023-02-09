enum IMAGE_TYPE {
  ID_CARD = "idcard",
  BACK_ID_CARD = "back_idcard",
  DRIVER_LICENSE = "driver_license",
  SELFIE = "selfie",
}

enum IMAGE_STATUS_TYPE {
  DOCUMENT_IMAGE = "document_image",
  SELFIE_IMAGE = "selfie_image",
}

enum CUSTOMER_DOCUMENT_TYPE {
  CITIZEN_CARD = "citizen_card",
  DRIVER_LICENSE = "driver_license",
}

enum EKYC_VERIFIED_STATUS {
  UNVERIFIED = "UNVERIFIED",
  REJECTED = "REJECTED",
  VERIFIED = "VERIFIED",
}

enum LOCALE_PARAMS {
  EN = "en",
  VI = "vi",
}

enum IMAGE_TYPE_PARAMS {
  ID_CARD = "idcard",
  DRIVER_LICENSE = "driver_license",
}

enum CHANNEL_SOURCE {
  ZALO = "ZALO",
  SCT = "SCT",
  DMS = "DMS",
}

enum GENDER {
  MALE = "M",
  FEMALE = "F",
}

export {
  IMAGE_TYPE,
  IMAGE_STATUS_TYPE,
  IMAGE_TYPE_PARAMS,
  LOCALE_PARAMS,
  CUSTOMER_DOCUMENT_TYPE,
  EKYC_VERIFIED_STATUS,
  CHANNEL_SOURCE,
  GENDER,
};
