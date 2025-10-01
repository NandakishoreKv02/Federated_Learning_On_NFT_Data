// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title PatientNFT - ERC721 with patient consent control
contract PatientNFT is ERC721URIStorage, Ownable {
    uint256 public nextTokenId = 1;
    mapping(uint256 => bool) private _allowTraining;

    event PatientMinted(uint256 indexed tokenId, address indexed owner, string tokenURI);
    event ConsentChanged(uint256 indexed tokenId, address indexed owner, bool allowed);

    // Pass initialOwner explicitly to Ownable
    constructor(address initialOwner) ERC721("PatientNFT", "PTNT") Ownable(initialOwner) {}

    function mintPatient(string memory tokenURI) external returns (uint256) {
        uint256 tokenId = nextTokenId;
        nextTokenId++;
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
        emit PatientMinted(tokenId, msg.sender, tokenURI);
        return tokenId;
    }

    function setAllowTraining(uint256 tokenId, bool allowed) external {
        require(ownerOf(tokenId) == msg.sender, "Only owner can toggle consent");
        _allowTraining[tokenId] = allowed;
        emit ConsentChanged(tokenId, msg.sender, allowed);
    }

    function isAllowed(uint256 tokenId) external view returns (bool) {
        return _allowTraining[tokenId];
    }
}
