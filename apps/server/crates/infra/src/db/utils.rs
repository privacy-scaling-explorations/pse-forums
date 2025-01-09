use crate::error::InfraError;
use bincode::{config::standard, Decode};
use sled::{Db, IVec};

#[inline]
pub fn ivec_to_u32(iv: &IVec) -> u32 {
    u32::from_be_bytes(iv.to_vec().as_slice().try_into().unwrap())
}

#[inline]
pub fn u32_to_ivec(number: u32) -> IVec {
    IVec::from(number.to_be_bytes().to_vec())
}

pub fn get_one<T>(db: &Db, tree_name: &str, id: u32) -> Result<T, InfraError>
where
    T: Decode,
{
    get_one_by_key(db, tree_name, u32_to_ivec(id))
}

pub fn get_id_by_name(db: &Db, tree_name: &str, name: &str) -> Result<Option<u32>, InfraError> {
    let v = db
        .open_tree(tree_name)?
        .get(name.replace(' ', "_").to_lowercase())?;
    Ok(v.map(|v| ivec_to_u32(&v)))
}

pub fn get_one_by_key<T, K>(db: &Db, tree_name: &str, key: K) -> Result<T, InfraError>
where
    T: Decode,
    K: AsRef<[u8]>,
{
    let v = db.open_tree(tree_name)?.get(key)?;
    if let Some(v) = v {
        let (one, _): (T, usize) = bincode::decode_from_slice(&v, standard())?;
        Ok(one)
    } else {
        Err(InfraError::NotFound)
    }
}
