const mongoose = require("mongoose");
const validator = require("validator").default;

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      email_str: {
        type: String,
        required: [true, "An email is required"],
        validate: (value) => {
          return validator.isEmail(value);
        },
        unique: true,
      },
      is_verified: {
        type: Boolean,
        default: false,
      },
    },
    password: {
      type: String,
      required: [true, "A password is required"],
    },
    phone_number: {
      phone_number_str: {
        type: String,
        default: "",
      },
      is_verified: {
        type: String,
        default: false,
      },
    },
    nik: {
      type: String,
      required: false,
    },
    full_name: {
      type: String,
      default: "",
    },
    occupation: {
      type: String,
      default: "",
    },
    date_of_birth: {
      type: Date,
      default: "",
    },
    city_of_birth: {
      type: String,
      default: "",
    },
    address_ktp: {
      address_str: {
        type: String,
        default: "",
      },
      rt: {
        type: String,
        default: "",
      },
      rw: {
        type: String,
        default: "",
      },
      kelurahan_desa: {
        type: String,
        default: "",
      },
      kecamatan: {
        type: String,
        default: "",
      },
      provinsi: {
        type: String,
        default: "",
      },
      kota: {
        type: String,
        default: "",
      },
    },
    address_domicile: {
      address_str: {
        type: String,
        default: "",
      },
      rt_rw: {
        type: String,
        default: "",
      },
      kelurahan_desa: {
        type: String,
        default: "",
      },
      kecamatan: {
        type: String,
        default: "",
      },
      provinsi: {
        type: String,
        default: "",
      },
      kota: {
        type: String,
        default: "",
      },
    },
    maps_long_lat: {
      longitude: {
        type: String,
        default: "",
      },
      latitude: {
        type: String,
        default: "",
      },
    },
    account_status: {
      type: String,
      enum: ["basic", "FansNya Superadmin", "FKBN Admin", "Surat Kabar Baik Admin"],
      default: "basic",
      trim: true,
    },
    profile_picture: {
      type: String,
      default: "",
    },
    fkbn_position: {
      type: String,
      default: "",
    },
    devices: [
      {
        device_os: {
          type: String,
          default: "",
        },
        mac_address: {
          type: String,
          default: "",
        },
        imei: {
          type: String,
          default: "",
        },
        ip_address: {
          type: String,
          default: "",
        },
        last_login: {
          type: Date,
          default: "",
        },
      },
    ],
    last_login: {
      type: Date,
      default: "",
    },
    date_join: {
      type: String,
    },
    pin: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;