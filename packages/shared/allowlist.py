"""
CivicProof AI - Government Domain Allowlist & SSRF Safeguards
"""
import ipaddress
from urllib.parse import urlparse
from typing import List, Tuple

# Official allow-listed government domains and suffixes for Indian Schemes
OFFICIAL_GOVERNMENT_DOMAINS = [
    "scholarships.gov.in",
    "www.scholarships.gov.in",
    "nsp.gov.in",
    "tnscholarships.gov.in",
    "pudhumaippenn.tn.gov.in",
    "adw.tn.gov.in",
    "bcmbcmw.tn.gov.in",
    "tndce.tn.gov.in",
    "aicte-india.org",
    "www.aicte-india.org",
    "ugc.ac.in",
    "www.ugc.ac.in",
    "dbtbharat.gov.in",
    "india.gov.in",
    "tn.gov.in",
    "www.tn.gov.in",
    "education.gov.in",
    "socialjustice.gov.in",
    "tribal.nic.in",
    "minorityaffairs.gov.in",
    "karnataka.gov.in",
    "kerala.gov.in",
    "ap.gov.in",
    "maharashtra.gov.in",
    "up.gov.in"
]

ALLOWED_DOMAIN_SUFFIXES = [
    ".gov.in",
    ".nic.in",
    ".ac.in",
    ".tn.gov.in",
    ".edu.in"
]

# Disallowed / Private IPv4 and IPv6 Subnets for SSRF protection
BLOCKED_IP_NETWORKS = [
    ipaddress.ip_network("0.0.0.0/8"),
    ipaddress.ip_network("10.0.0.0/8"),
    ipaddress.ip_network("100.64.0.0/10"),
    ipaddress.ip_network("127.0.0.0/8"),
    ipaddress.ip_network("169.254.0.0/16"),       # Cloud metadata & link-local
    ipaddress.ip_network("172.16.0.0/12"),
    ipaddress.ip_network("192.0.0.0/24"),
    ipaddress.ip_network("192.0.2.0/24"),
    ipaddress.ip_network("192.88.99.0/24"),
    ipaddress.ip_network("192.168.0.0/16"),
    ipaddress.ip_network("198.18.0.0/15"),
    ipaddress.ip_network("198.51.100.0/24"),
    ipaddress.ip_network("203.0.113.0/24"),
    ipaddress.ip_network("224.0.0.0/4"),          # Multicast
    ipaddress.ip_network("240.0.0.0/4"),          # Reserved
    ipaddress.ip_network("255.255.255.255/32"),
    # IPv6
    ipaddress.ip_network("::/128"),
    ipaddress.ip_network("::1/128"),              # Loopback
    ipaddress.ip_network("fc00::/7"),             # Unique Local
    ipaddress.ip_network("fe80::/10"),            # Link-Local
]


def is_domain_allowed(url: str) -> bool:
    """
    Validates whether the URL's hostname matches the official government domain allow-list.
    """
    try:
        parsed = urlparse(url)
        hostname = parsed.hostname
        if not hostname:
            return False
        hostname = hostname.lower()

        # Check exact match
        if hostname in OFFICIAL_GOVERNMENT_DOMAINS:
            return True

        # Check suffix match
        for suffix in ALLOWED_DOMAIN_SUFFIXES:
            if hostname.endswith(suffix):
                return True

        return False
    except Exception:
        return False


def is_ip_safe(ip_str: str) -> bool:
    """
    Validates that a resolved IP address does not fall into private, loopback, or cloud-metadata subnets.
    """
    try:
        ip = ipaddress.ip_address(ip_str)
        for network in BLOCKED_IP_NETWORKS:
            if ip in network:
                return False
        return True
    except ValueError:
        return False
