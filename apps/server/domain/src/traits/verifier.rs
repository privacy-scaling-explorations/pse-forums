// domain/src/lib.rs

use async_trait::async_trait;

/// The `Verifier` trait defines a common interface for pluggable proof verification.
/// Each implementation specifies:
/// - The type of proof it accepts (`Proof`),
/// - The data produced upon successful verification (`VerifiedData`),
/// - The type of error it returns on failure (`Error`).
#[async_trait]
pub trait Verifier {
    type Proof;
    type VerifiedData;
    type Error: std::error::Error + Send + Sync + 'static;

    /// Asynchronously verifies the given proof.
    ///
    /// # Arguments
    /// * `proof` - A proof of type `Self::Proof` to be verified.
    ///
    /// # Returns
    /// * `Ok(Self::VerifiedData)` if the proof is valid,
    /// * `Err(Self::Error)` if verification fails.
    async fn verify(&self, proof: Self::Proof) -> Result<Self::VerifiedData, Self::Error>;
}
