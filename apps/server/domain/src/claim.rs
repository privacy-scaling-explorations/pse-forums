use chrono::{DateTime, FixedOffset};
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize)]
pub struct Claim {
    pub uid: String,
    #[serde(with = "custom_datetime")]
    pub exp: DateTime<FixedOffset>,
    pub username: String,
}

mod custom_datetime {
    use chrono::{DateTime, FixedOffset, NaiveDateTime, TimeZone};
    use serde::{self, Deserialize, Deserializer, Serializer};

    pub fn serialize<S>(date: &DateTime<FixedOffset>, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        serializer.serialize_i64(date.timestamp())
    }

    pub fn deserialize<'de, D>(deserializer: D) -> Result<DateTime<FixedOffset>, D::Error>
    where
        D: Deserializer<'de>,
    {
        let timestamp = i64::deserialize(deserializer)?;
        let naive = NaiveDateTime::from_timestamp_opt(timestamp, 0)
            .ok_or_else(|| serde::de::Error::custom(format!("Invalid timestamp: {timestamp}")))?;
        Ok(FixedOffset::east_opt(0)
            .ok_or_else(|| serde::de::Error::custom("Invalid timezone offset"))?
            .from_utc_datetime(&naive))
    }
}
